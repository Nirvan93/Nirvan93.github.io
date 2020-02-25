"use strict";var Layout={win:$(window),body:$("body"),header:$("body > header"),headerHeight:$("body > header").outerHeight(),boxResult:$(".result"),boxResPos:$(".result").position(),boxes:$(".boxes"),topBoxesCon:$(".top-boxes"),topBoxesWidth:$(".top-boxes").outerWidth(),topBoxesHeight:$(".top-boxes").outerHeight(),resizer:$("#resizer"),resizerHeight:$("#resizer").outerHeight(),dragCover:$("#editor-drag-cover"),widthReadout:$("#width-readout"),readoutTimer:0,editorResizers:$(".editor-resizer"),footerHeight:$(".editor-footer").outerHeight(),dontTreadOnMe:!1,init:function(){this._bindToHub(),this.initLayout(),this.setUpEditorResizers(),this.widthReadoutSetup(),this.preventTabletZooming(),null==this.headerHeight&&(this.headerHeight=0)},_bindToHub:function(){Hub.sub("server-ui-change",$.proxy(this._onUIChange,this))},_onUIChange:function(t,e){if(e.ui&&e.ui.layout&&"top"!==e.ui.layout){var o=$("#"+e.ui.layout+"-layout").attr("href");document.location=o}},setAllEditorHeights:function(t){CP.htmlEditor.editor.setSize(null,t),CP.cssEditor.editor.setSize(null,t),CP.jsEditor.editor.setSize(null,t)},setUpEditorResizers:function(){Layout.editorResizers.draggable({start:function(){Layout.topBoxesCon.addClass("editor-is-resizing"),Layout.origCSSEditorWidth=$("#box-css").width(),Layout.origHTMLEditorWidth=$("#box-html").width()},stop:function(){Layout.topBoxesCon.removeClass("editor-is-resizing"),Hub.pub("editor-refresh",{delay:200})},axis:"x",drag:function(t,e){"editor-resizer-html"===e.helper[0].id?$("#box-html").css("flex","0 1 "+e.offset.left+"px"):$("#box-css").css("flex","0 1 "+(Layout.origCSSEditorWidth+e.position.left)+"px")},containment:Layout.boxes})},initLayout:function(){$("#box-html").css("flex","0 1 "+$("#box-html").width()+"px");var t=Layout.body.height();Layout.boxResult.height(t-Layout.topBoxesHeight-Layout.resizerHeight-Layout.footerHeight-Layout.headerHeight),Layout.win.on("resize",function(){t=Layout.body.height(),Layout.topBoxesHeight=$(".top-boxes").outerHeight(),Layout.boxResult.height("pres"===__pageType?t-Layout.topBoxesHeight-Layout.footerHeight-Layout.resizerHeight:t-Layout.topBoxesHeight-Layout.footerHeight-Layout.headerHeight-Layout.resizerHeight),$(".result > iframe").width(Layout.win.width()),Layout.setAllEditorHeights(Layout.topBoxesCon.height()-32)}),Layout.resizer.draggable({start:function(){Layout.dragCover.show()},stop:function(t,e){Layout.stopDragging(t,e)},axis:"y",drag:function(t,e){var o=Layout.body.height();"pres"===__pageType?(Layout.topBoxesCon.height(e.offset.top),Layout.boxResult.height(o-e.offset.top-Layout.footerHeight-Layout.resizerHeight)):(Layout.topBoxesCon.height(e.offset.top-Layout.headerHeight),Layout.boxResult.height(o-e.offset.top-Layout.footerHeight-Layout.resizerHeight));var i;"pres"===__pageType?(i=e.offset.top-32,93>i&&(i=93),Layout.setAllEditorHeights(i)):(i=e.offset.top-95,93>i&&(i=93),Layout.setAllEditorHeights(i))},containment:Layout.boxes})},widthReadoutSetup:function(){Layout.win.load(function(){Layout.win.on("resize",function(){clearTimeout(Layout.readoutTimer),Layout.widthReadout.addClass("visible"),Layout.widthReadout.text(Layout.win.width()+"px"),Layout.readoutTimer=setTimeout(function(){Layout.widthReadout.removeClass("visible")},1e3)})})},stopDragging:function(){Layout.dragCover.hide(),"function"==typeof Comment.tweakCommentsSize&&Comment.tweakCommentsSize(),Hub.pub("editor-refresh",{delay:0})},doneLoading:function(){Layout.body.removeClass("prelayout"),Layout.win.load($.proxy(function(){this.body.removeClass("preload")},this)).resize(),Layout.setAllEditorHeights(Layout.topBoxesCon.height()-32)},preventTabletZooming:function(){var t=navigator.userAgent.match(/(iPad)/g)?!0:!1;t&&$("head").append("<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'>")}};Layout.init();