# dataList 1.05
dataList is a jQuery plugin to make, easier and usable the use of drop down elements by adding predictive search, events management and styles. In addition, you can combine this plugin with the Bootstrap capabilities or another frameworks.

Is multilanguage, cross browser compatibility, very customizable and, by your design, is one of fastest of internet.

Example
=======
<img  src="data:image/png;base64,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" />

Install
=======
Your install is very easy. Only you must insert the following source code files.
```html
<script src="js/dataList.js"></script>
<link href="css/dataList.css" rel="stylesheet">
```

How to use
==========
There are several ways to use

Basic Use
---------
```html
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <select id="select" class="form-control" placeholder="Please, enter a choice">
            <option value="1">Option A</option>
            <option value="2">Option B</option>
            <option value="3">Option C</option>
        </select>
    </div>
</div>

<script>
    $('#select').dataList();
</script>
```

Advanced Configuration
----------------------
<h3>Configuration to single DataList with customized parameters</h3>
```html
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <select multiple id="select" class="form-control" placeholder="Please, enter a choice">
            <option value="1">Red</option>
            <option value="2">Green</option>
            <option value="3">Blue</option>
        </select>
    </div>
</div>

<script>
    var optionsDT = {
        emptyMessage:'Without results',
        parameterToSend:'q',
        return_mask:'value - text'
    $('#select').dataList(optionsDT);
</script>
```

<h3>Configuration to DataList of type multiple with customized parameters</h3>
```html
<div class="row">
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
        <div class="form-group">
            <div>
                <select id="select" class="form-control" placeholder="Search" multiple>
                    <option value="1">User 1</option>
                    <option value="2">User 2</option>
                    <option value="3">User 3C</option>
                </select>
            </div>
        </div>
    </div>
</div>

<script>
    var optionsDT = {
        emptyMessage:'Without results',
        parameterToSend:'q',
        return_mask:'value - text',
        multiple_class: 'form-control'
    $('#select').dataList(optionsDT);
</script>
```

Default messages
----------------
```javascript
// Define the values
var optionsDT = {
        addClassIfError:'error',
        ajax: false,
        ajaxErrorMessage:"Request failed",
        dataRanking:'enabled',
        datalistAttr: "data-list",
        defaultMessage:'Please, select a choice',
        default_value:"",
        emptyMessage:"No results found",
        error400:"Server understood the request, but request content was invalid",
        error401:"Unauthorized access",
        error403:"Forbidden resource can\'t be accessed",
        error404:"Not found",
        error500:"Internal server error",
        error503:"Service unavailable",
        errorAbort:'Request was aborted by the server',
        errorParse:'Parsing JSON request failed',
        errorTimeOut:'Request time out',
        errorUnknown:'Unknown error',
        method: "post",
        multiple_class:'',
        parameterToSend:"query",
        requiredMessage:'Please, enter at least one value',
        return_mask:"text",
        url:"",
        value_selected_to:""
    };
```
Default messages Description
----------------------------
<b>addClassIfError</b>: If an error is produced, is added this value to 'class' attribute. By default is "error".

<b>ajax</b>: This parameter indicates if the read/recovery of data will do in asynchronous / synchronous mode. By default is 'false'.

<b>ajaxErrorMessage</b>: Error message if the read/recovery of data fail. By default is 'Request failed'.

<b>dataRanking</b>: This parameter show the value of 'data-rank' property setted into every option of 'select tag'.

<b>datalistAttr</b>: This parameter is the field will to save the "select tag" name with the options.

<b>defaultMessage</b>: Message by default to use, for example, in 'placeholder' property o 'first option' of "select tag".

<b>default_value</b>: Default value of "select tag".

<b>emptyMessage</b>: Message by default to use when no results found. By default is "No results found".

<b>error400</b>: Used into ajax mode. By default is "Server understood the request, but request content was invalid".

<b>error401</b>: Used into ajax mode. By default is "Unauthorized access".

<b>error403</b>: Used into ajax mode. By default is "Forbidden resource can\'t be accessed".

<b>error404</b>: Used into ajax mode. By default is "Not found".

<b>error500</b>: Used into ajax mode. By default is "Internal server error".

<b>errorAbort</b>: Used into ajax mode. By default is "Request was aborted by the server".

<b>errorParse</b>: Used into ajax mode. By default is "Parsing JSON request failed".

<b>errorTimeOut</b>: Used into ajax mode. By default is "Request time out".

<b>errorUnknown</b>: Used into ajax mode. By default is "Unknown error".

<b>method</b>: Used into ajax mode to define the method of recover file. Like possible options ar "get" or "post". By default is "post".

<b>multiple_class</b>: Used to add a CSS class to the results container into dataList of type multiple. By default is empty. If you use Bootstrap you can set this parameter to "form-control" to add the default styles.

<b>parameterToSend</b>: Used into ajax mode. When the Ajax mode is used, like parameter is sent this name. By default is "query". More later, from PHP for example, you can recover the value of this parameter through of $_REQUEST['query'].
```javascript 
var optionsDT = { parameterToSend: 'q' };
```

<b>requiredMessage</b>:  Message to indicates the field is required. By default is "Please, enter at least one value".

<b>return_mask</b>: This parameter indicates the values you want to show. There are two possible key options: 
    <ul>
        <li><b>value</b>:Will show the value property.</li>
        <li><b>text</b>:Will show the text property.</li>
    </ul>
For example:
```javascript 
var optionsDT = { return_mask: 'text' };
var optionsDT = { return_mask: 'value' };
var optionsDT = { return_mask: 'value - text' };
```

<b>url</b>: This parameter indicates the URL where data will recover and, more later, will inserted in 'select tag'. 

<b>value_selected_to</b>: This parameter is used to send the value property of 'select tag' to another field. For example if you want to sent only the ID of a input field inside a form, if you set like value the property the ID property of another element, when selects an option, the value will be copied to that target ID.

NOTE: To can use this option is necessary set "return_mask" property to 'value - text'.

For example: 
```javascript 
var optionsDT = { value_selected_to: 'depends_id' };
```
And an example of HTML will be:
```html
<div class="col-xs-9 col-sm-9 col-md-10 col-lg-11">
    <div class="form-group">
        <label>ID</label>
            <div>
                <input name="depends_id" id="depends_id" value="" class="form-control" placeholder="ID value" />
                <select id="depends" class="form-control" placeholder="Search">
                    <option value="1">Option A</option>
                    <option value="2">Option B</option>
                    <option value="3">Option C</option>
                </select>
            </div>
    </div>
</div>
<script>
    var optionsDT = { value_selected_to: 'depends_id', return_mask: 'value - text' };
    $('#depends').dataList(optionsDT);
</script>
```

For more information on web design and development don't leave to visit <a target="_blank"  href="http://www.islavisual.com/articulos/desarrollo_web/">islavisual.com</a>.
