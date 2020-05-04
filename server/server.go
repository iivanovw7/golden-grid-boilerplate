package main

import (
  "errors"
  "fmt"
  "github.com/BurntSushi/toml"
  "github.com/visionmedia/go-cli-log"
  "net/http"
)

// Main application config structure
type Config struct {
  Port string // Web server port config
  NotFoundPage string // Default redirect path if page not found
  DebugMsgPref string // Logger prefix for Debug messages
  InfoMsgPref string // Logger prefix for Status messages
  Domain string // Domain name, used for CORS configuration
  Debug bool // Debug mode
}

type NotFoundRedirectRespWr struct {
  http.ResponseWriter // We embed http.ResponseWriter
  status int
}

func (write *NotFoundRedirectRespWr) WriteHeader(status int) {
  write.status = status // Store the status for our own use
  if status != http.StatusNotFound {
    write.ResponseWriter.WriteHeader(status)
  }
}

func (write *NotFoundRedirectRespWr) Write(p []byte) (int, error) {
  if write.status != http.StatusNotFound {
    return write.ResponseWriter.Write(p)
  }
  return len(p), nil // Lie that we successfully written it
}

// Sets CORS headers
func setupResponse(write *http.ResponseWriter, req *http.Request, conf Config) {
  //(*write).Header().Set("Content-Type", "application/javascript")
  //(*write).Header().Set("Content Type", "text-html")
  (*write).Header().Set("Access-Control-Allow-Origin", conf.Domain)
  (*write).Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS")
  (*write).Header().Set("Access-Control-Allow-Credentials", "true")
  (*write).Header().Set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
}

/*
  Wraps http handler to check status code,
  and if code is 404 - make redirect to custom 404 page.
 */
func wrapHandler(handler http.Handler, conf Config) http.HandlerFunc {
  return func(write http.ResponseWriter, req *http.Request) {

    // Add response headers
    setupResponse(&write, req, conf)
    if (*req).Method == "OPTIONS" {
      return
    }

    nfrw := &NotFoundRedirectRespWr{ResponseWriter: write}
    handler.ServeHTTP(nfrw, req)

    if conf.Debug {
      log.Debug(conf.DebugMsgPref, "%s %s Response header: %s", "Serving:", req.RequestURI, nfrw.status)
    }

    // If status code is 404 - crete logger output and redirect request to custom 404 page
    if nfrw.status == 404 {
      if conf.Debug {
        log.Debug(conf.DebugMsgPref, "Redirecting %s to %s", req.RequestURI, conf.NotFoundPage)
      }
      http.Redirect(write, req, conf.NotFoundPage, http.StatusFound)
    }
  }
}

func main() {

  var conf Config
  // Read main application config
  if _, err := toml.DecodeFile("./config.toml", &conf); err != nil {
    log.Error(errors.New("cannot read config file"))
    fmt.Println(err)
  }

  log.Verbose = true
  log.Info(conf.InfoMsgPref, "%#v", conf)
  log.Info(conf.InfoMsgPref, "%s%s", "Starting server on port", conf.Port)

  // Custom http handler
  fs := wrapHandler(http.FileServer(http.Dir("../dist")), conf)
  http.HandleFunc("/", fs)

  // Listen PORT
  log.Info(conf.InfoMsgPref,"%s%s","Listening... port", conf.Port)
  if err := http.ListenAndServe(conf.Port, nil); err != nil {
    log.Error(errors.New("cannot listen port"))
    fmt.Println(err)
  }

}


