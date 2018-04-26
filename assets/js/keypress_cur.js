function addEvent( obj, type, fn ) {
    if (obj.addEventListener) {
        obj.addEventListener( type, fn, false );
        EventCache.add(obj, type, fn);
    }
    else if (obj.attachEvent) {
        obj["e"+type+fn] = fn;
        obj[type+fn] = function() { obj["e"+type+fn]( window.event ); }
        obj.attachEvent( "on"+type, obj[type+fn] );
        EventCache.add(obj, type, fn);
    }
    else {
        obj["on"+type] = obj["e"+type+fn];
    }
};
var EventCache = function(){
    var listEvents = [];
    return {
        listEvents : listEvents,
        add : function(node, sEventName, fHandler){
            listEvents.push(arguments);
        },
        flush : function(){
            var i, item;
            for(i = listEvents.length - 1; i >= 0; i = i - 1){
                item = listEvents[i];
                if(item[0].removeEventListener){
                    item[0].removeEventListener(item[1], item[2], item[3]);
                };
                if(item[1].substring(0, 2) != "on"){
                    item[1] = "on" + item[1];
                };
                if(item[0].detachEvent){
                    item[0].detachEvent(item[1], item[2]);
                };
                item[0][item[1]] = null;
            };
        }
    };
}();
addEvent(window,'unload',EventCache.flush);
function KeypressThrow(e){
    if(window.event)
         window.event.returnValue = null;
    else
       if(e.preventDefault)
            e.preventDefault();
            e.returnValue = false;
    return false;    
};

function isLocked(e){
    KeypressThrow(e);
};

function isNumeric(e){
    var key =(window.event) ? window.event.keyCode:e.charCode;
    var nkey = String.fromCharCode(key);
    if(key !=0 && nkey.match(/[^0-9]/)){
       KeypressThrow(e);
    }
};
function isCurrency(e){
    var key =(window.event) ? window.event.keyCode:e.charCode;
    var nkey = String.fromCharCode(key);
    var el = getTarget(e); 
    var arr_val = el.value.split(','); 
    hasDot = (el.value.indexOf(",") ==-1) ? false:(key ==44 || key !=0 && arr_val[1] && arr_val[1].length==2) ? true:false;
    if(hasDot || key !=0 && nkey.match(/[^0-9,]/)){
        KeypressThrow(e);
    }
    
};

function getCaretPos(elm)
{
     var cpos = 0;
     if (document.selection) { 
         elm.focus ();
         var oSel = document.selection.createRange();
         oSel.moveStart ('character', -elm.value.length);
         cpos = oSel.text.length;
     }else if (elm.selectionStart || elm.selectionStart == '0'){
         cpos = elm.selectionStart;
     }    
     return (cpos);
};
   
function setCaretPos(elm, cpos)
{
     if (document.selection) { 
         elm.focus();
         var oSel = document.selection.createRange();
         oSel.moveStart ('character', -elm.value.length);
         oSel.moveStart ('character', cpos);
         oSel.moveEnd ('character', 0);
      //  oSel.select ();
     }else if (elm.selectionStart || elm.selectionStart == '0') {
         elm.selectionStart = cpos;
         elm.selectionEnd = cpos;
         elm.focus();
     }
};

function CurFormat(e){
var el = getTarget(e);  
var tmp1 = '';
  var elm='';
  elm  = RemStr(el.value,'.');
  if(el.maxLength<0){
     el.setAttribute('maxLength','15') 
  }     
  if(el.maxLength > el.value.length -1){
    if(elm.indexOf(',') !=-1){
       arr_val = elm.split(",");
       tmp1 = FormatCurrency(arr_val[0])+','+ arr_val[1];
       el.value = tmp1;//substring(0,tmp1.length -1);
     
    }else{
       var key =(window.event) ? window.event.keyCode:e.charCode;
       var caret = 0;
       caret = getCaretPos(el);      
       if(key ==0 || key == 44 ){
           tmp1 = FormatCurrency(elm);
           el.value = tmp1; //.substring(0,tmp1.length -1);
       }   
       if(key >= 48){
           tmp1 = FormatCurrency(elm);
           el.value = tmp1; //.substring(0,tmp1.length -1);
       }
   //    setCaretPos(el,caret);  
     }
    
  }
 //el.focus();
};
    function RemStr(data,schar){
        var tmpStr='';
        if(data && data.indexOf('.')!=-1){
            tmpStr = data.replace(/[.]/g,'');
         }else{
            tmpStr = data;
        }
        return tmpStr;
    }
        function FormatCurrency(data){
            var tmp1='';
            var num=''; 
            var i = 0;
            tmp1 = insComma(data);
            var total = tmp1.length;
           for (i = total-1; i >= 0; i--) 
           {
              num += tmp1.charAt(i);
           }         
            return num;
        }
            function insComma(data){
               var count = 0;
               var i = 0;
               var tmpStr = "";
               var comma = ".";
            
              for (i = (data.length)-1; i >= 0; i--) {
                  if (count == 3){
                     tmpStr += comma;
                     count = 1;
                  }else 
                     count ++;
                  if(data.charAt(i)==',')
                  {
                     count = 0;
                     tmpStr = tmpStr.replace(/[.]/g,'');
                  }      
                  tmpStr += data.charAt(i); 
               }
               return tmpStr;
            };

function DateFormat(e){
    var obj = getTarget(e);
     var date = obj.value;
    var    dkey = (window.event) ? window.event.keyCode:e.charCode;
    if(dkey != 46){
        if (/^\d{2}$/.test(date)){
            obj.value=obj.value+'/'; return false; 
        }
        if (/^\d{2}\/\d{2}$/.test(date)){
            obj.value=obj.value+'/'; return false; 
        }
        if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)){
            return false; 
        }
    }
};

function getTarget(e){
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target){
      return false;
    }else{
      return target;
    }
};

function addKeypressListener(){
  var el = document.getElementsByTagName('input');
  var elm = [];
  if(typeof el.length != 'number'){
      var count=0;
      while (typeof el[count] != 'undefined') {
         els = el[count]; 
         if(els.rel !=''){
             elm.push(els);
         }
         count++;
      }
      el = elm;
  }
  for(var i=0;i<el.length;i++){
   if(el[i].type == 'text'){   
    switch (el[i].getAttribute("rel")){
    case 'num':
        textAlign(el[i],'');
        addEvent(el[i],'keypress',isNumeric);
        break;
    case 'cal':
        el[i].style.textAlign='left';
        addEvent(el[i],'keypress',isNumeric);
        addEvent(el[i],'keyup',DateFormat);                        
        break;
    case 'cur':
        textAlign(el[i],'');
        addEvent(el[i],'keypress',isCurrency);
        addEvent(el[i],'keyup',CurFormat);    
        break;
    case 'dis':
        addEvent(el[i],'keypress',isLocked);
        break;
    }          
   }    
  }
};

function textAlign(el,alignment){
    if(navigator.userAgent.indexOf("MSIE") == -1){
       el.style.textAlign=alignment;
    }    
};
addEvent(window,'load',addKeypressListener);