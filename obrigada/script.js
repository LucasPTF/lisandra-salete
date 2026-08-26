
(function(){
  function cookie(name){
    var match=document.cookie.match(new RegExp('(?:^|; )'+name.replace(/[.$?*|{}()\[\]\\/+^]/g,'\\$&')+'=([^;]*)'));
    return match?decodeURIComponent(match[1]):undefined;
  }
  var eventId=window.metaPurchaseEventId;
  if(!eventId)return;
  fetch('/api/meta-purchase',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({event_id:eventId,event_source_url:location.href,fbp:cookie('_fbp'),fbc:cookie('_fbc')}),
    keepalive:true
  }).catch(function(){});
})();
