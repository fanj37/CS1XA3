module Main exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)

main =
      Browser.sandbox { init = init, update = update, view = view }

type alias Model =
        { stage1 : String, stage2 : String }

init : Model
init = 
       Model "" ""

type Msg
        = Stage1 String
        | Stage2 String

update : Msg -> Model -> Model
update msg model = 
        case msg of 
                Stage1 stage1 ->
                        { model | stage1 = stage1 }
                Stage2 stage2 ->
                        { model | stage2 = stage2 }
view : Model -> Html Msg
view model = 
        div [] 
                [ input [ type_ "text", value model.stage1, onInput Stage1 ]  
                [], input [ type_ "text", value model.stage2, onInput Stage2 ] 
                [], div [] [ text (model.stage1), text ":", text (model.stage2) ] ]