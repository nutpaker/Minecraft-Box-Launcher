function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function instancelistTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (data) {if(data == undefined || data.length == 0)
{
pug_html = pug_html + "\u003Cp\u003E" + (pug_escape(null == (pug_interp = "You don't have any instances yet. Create one to start playing. 😆") ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
}
else
{
for(let i = 0; i < data.length; i++)
{
pug_html = pug_html + "\u003Csection" + (" class=\"item\""+pug_attr("data-instance-id", data[i].id, true, false)+pug_attr("data-instance-clienttype", data[i].clientType || "Vanilla", true, false)+pug_attr("data-instance-type", data[i].type, true, false)) + "\u003E\u003Cdiv class=\"content\"\u003E\u003Cdiv class=\"ui grid\"\u003E\u003Cdiv class=\"twelve wide column\"\u003E\u003Ch3 class=\"ui header\"\u003E" + (pug_escape(null == (pug_interp = data[i].name) ? "" : pug_interp)) + "\u003C\u002Fh3\u003E\u003Cp class=\"description\"\u003Edata[i].clientType || \"Vanilla\"\u003Cstrong\u003E" + (pug_escape(null == (pug_interp = data[i].id) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E(" + (pug_escape(null == (pug_interp = data[i].type) ? "" : pug_interp)) + ")\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"four wide column\"\u003E\u003Cdiv class=\"ui right floated buttons\"\u003E\u003Cdiv class=\"ui green button\"\u003EPlay\u003C\u002Fdiv\u003E\u003Cdiv class=\"ui olive floating dropdown button\"\u003E▼\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"item\"\u003ERename\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EReinstall\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EOptions\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EDelete\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
}
}}.call(this,"data" in locals_for_with?locals_for_with.data:typeof data!=="undefined"?data:undefined));;return pug_html;}