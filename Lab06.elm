module Main exposing (main)
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

main =
               Browser.sandbox { init = init, update = update, view = view }

type alias Model =
               { stage : String, stag : String }

init : Model
init = 
                Model "" ""

type Msg
                = Stage String
                | Stag String

update : Msg -> Model -> Model
update msg model = 
                case msg of 
                                Stage stage ->
                                                { model | stage = stage }
                                Stag stag ->
                                                { model | stag = stag }
view : Model -> Html Msg
view model = 
                div [] 
                                [ input [ type_ "text", value model.stage, onInput Stage ] 
                                [], input [ type_ "text", value model.stag, onInput Stag ]
                                [], div [] [ text (model.stage), text ":", text (model.stag) ] ]
