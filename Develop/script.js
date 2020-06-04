// Configuration
var characterSet = [
  [true, "Numbers", "0123456789"],
  [true, "Lowercase", "abcdefghijklmnopqrstuvwxyz"],
  [false, "Uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  [false, "Symbols", "!\"#$%&'()*+,-./<=>^@[\\]`~_{|}"],
];
// Assignment Code
var generateBtn = document.querySelector("#generate");
var cryptoObject    = null;
var currentPassword = null;

//Charsets-----------------------------------------------------
function initCharsets() {
	function createElem(tagName, attribs) {
		var result = document.createElement(tagName);
		if (attribs !== undefined) {
			for (var key in attribs)
				result[key] = attribs[key];
		}
		return result;
	}
	
	var container = document.querySelector("#charset tbody");
	var endElem = document.querySelector("#charset tbody > tr:last-child");
	CHARACTER_SETS.forEach(function(entry, i) {
		var tr = createElem("tr");
		var td = tr.appendChild(createElem("td"));
		var input = td.appendChild(createElem("input", {
			type: "checkbox",
			checked: entry[0],
			id: "charset-" + i}));
		var td = tr.appendChild(createElem("td"));
		var label = td.appendChild(createElem("label", {
			htmlFor: "charset-" + i,
			textContent: " " + entry[1] + " "}));
		var small = label.appendChild(createElem("small", {
			textContent: "(" + entry[2] + ")"}));
		container.insertBefore(tr, endElem);
  });
}
//Crypto-------------------------------------------------------
function initCrypto() {
	var elem = document.getElementById("crypto-getrandomvalues-entropy");
	elem.textContent = "\u2717";  // X mark
	
	if ("crypto" in window)
		cryptoObject = crypto;
	else if ("msCrypto" in window)
		cryptoObject = msCrypto;
	else
		return;
	
	if ("getRandomValues" in cryptoObject && "Uint32Array" in window && typeof Uint32Array == "function")
		elem.textContent = "\u2713";  // Check mark
	else
		cryptoObject = null;
}

//-------------------------------------------------------------

// Write password to the #password input
currentPassword = generatePassword(charset, length);
	
	// Calculate and format entropy
	var entropy = Math.log(charset.length) * length / Math.log(2);
	var entropystr;
	if (entropy < 70)
		entropystr = entropy.toFixed(2);
	else if (entropy < 200)
		entropystr = entropy.toFixed(1);
	else
		entropystr = entropy.toFixed(0);
	
	// Set output elements
	passwordElem.textContent = currentPassword;
	statisticsElem.textContent = "Length = " + length + " chars, \u00A0\u00A0Charset size = " +
		charset.length + " symbols, \u00A0\u00A0Entropy = " + entropystr + " bits";
	copyElem.disabled = false;



function doCopy() {
	var container = document.querySelector("article");
	var textarea = document.createElement("textarea");
	textarea.style.position = "fixed";
	textarea.style.opacity = "0";
	container.insertBefore(textarea, container.firstChild);
	textarea.value = currentPassword;
	textarea.focus();
	textarea.select();
	document.execCommand("copy");
	container.removeChild(textarea);
}

//-------------------------------------------------------------

function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);