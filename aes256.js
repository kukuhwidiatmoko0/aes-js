
function encrypt(message,key,iv){
 
var key = CryptoJS.enc.Utf8.parse(key);    
var iv  = CryptoJS.enc.Utf8.parse(iv);            
var encryptedCP = CryptoJS.AES.encrypt(message, key, { iv: iv });
var decryptedWA = CryptoJS.AES.decrypt(encryptedCP, key, { iv: iv});

var encryptedBase64 = encryptedCP.toString();                               
var decryptedUtf8 = decryptedWA.toString(CryptoJS.enc.Utf8);   

          
	//console.log("Ciphertext (Base64)  : " +  encryptedBase64) ;                                                                          
	//console.log("Ciphertext (hex)  : " + base64ToHex(encryptedBase64));
 return base64ToHex(encryptedBase64);


}



function decrypt(message,key,iv){
     
var key = CryptoJS.enc.Utf8.parse(key);    
var iv  = CryptoJS.enc.Utf8.parse(iv);            
 
var decryptedWA = CryptoJS.AES.decrypt(hexToBase64(message) , key, { iv: iv});

                      
var decryptedUtf8 = decryptedWA.toString(CryptoJS.enc.Utf8);             
                                                                           
 //console.log("Decrypted (Base64)  : " +  hexToBase64(message)) ;    
//console.log("Decrypted data (Utf8): " + decryptedUtf8); 

return decryptedUtf8;
}

function hexToBase64(str) {
    var bString = "";
    for( var i = 0; i < str.length; i +=2) {
         bString += String.fromCharCode( parseInt( str.substr( i, 2), 16));
    }
    return btoa(bString);
}

function base64ToHex(str) {
  var raw = atob(str);
  var result = '';
  for (var i = 0; i < raw.length; i++) {
    var hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result.toUpperCase();
}

 	 
 function getOriginalJson(jsString,password) {
	//console.log(password);
	 var datamessage = "";
	 $(jsString).each(function (key, value) {
	 
	
		datamessage = decrypt(value.message,password,value.uniqueid);
	 	//console.log(datamessage);
		 
	 });
	 
	
	 
	 return datamessage;
 }
 
 
  function getOriginalImage(jsString) {
 
	 return  decrypt(jsString,"A9CCF340D9A490104AC5159B8E1CBXXX","JFKlnUZyyu0MzRqj");;
 }
 
 
 function getTimeStamp(){
	 
	var m = new Date();
	var dateString =
		m.getUTCFullYear() + "/" +
		("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
		("0" + m.getUTCDate()).slice(-2) + " " +
		("0" + m.getUTCHours()).slice(-2) + ":" +
		("0" + m.getUTCMinutes()).slice(-2) + ":" +
		("0" + m.getUTCSeconds()).slice(-2);
		
	return dateString;	
 }
 
 function getToDay(){
	 
	var m = new Date();
	var dateString =
		m.getUTCFullYear() + "/" +
		("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
		("0" + m.getUTCDate()).slice(-2) + " " 
		
	return dateString;	
 }
 
 function getObjJsonFormat(password,apikey,uniqueid,timestamp,message){
 
 
   
   var datastr = '{"apikey" : "'+ apikey +'","uniqueid" : "'+ uniqueid +'" ,"timestamp" : "'+ timestamp +'","message" : "'+ encrypt(message,password,uniqueid) +'"}';
 

	return datastr;
 }
 
 
//console.log(encrypt(message,'A9CCF340D9A490104AC5159B8E1CBXXX','JFKlnUZyyu0MzRqj'));
//console.log(decrypt('AAAFC5BB35DA3F56578EAA0BBE6F0ADA55564570392A1C0F0888A821E8309AA210E820231C01078705F3E822B2584B2D3B4CF1777F38C9D8E3D8375E06DF920C918010D07FA4B8933A725F12C1C20B74A13FB872B5612F81CC849750689A97B1AAC0F70F797C835774CF3304BD2237F7590C01C88127F94D8B5C2BBE7B7325FCDF0F738EB5442BB214B0EB6EFC82147D0284326E9EF67A169BC62333626BA3FFAA3ABAE97E0D16EB3CCBD44EE64EF722CD5AC26F711DF6EF5CF5096C8A3C4F773D9802273F2F5682D1A30334E9214DC35A4EC7B3A4F0AAFF4669D3F793F3DFA329C34A87C0D8DC3B415FD3798B7A847A48864C1FE9312E9D4DCC0C8DFD5ADA7A9990B9D929E505E815453C02CAA893B9','A9CCF340D9A490104AC5159B8E1CBXXX', 'JFKlnUZyyu0MzRqj'));