# dataList 1.04
dataList is a jQuery plugin to make, easier and usable the use of drop down elements by adding predictive search, events management and styles.

Install
=======
Your install is very easy. Only you must insert the following source code files.
```html
<script src="js/dataList.js"></script>
<link href="css/dataList.css?" rel="stylesheet">
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
```
```javascript
    <script>
        $('#select').dataList();
    </script>
```

Advanced Configuration
----------------------

Default messages
----------------
<b>addClassIfError</b>: If an error is produced, is added this value to 'class' attribute.

<b>ajax</b>: This parameter indicates if the read/recovery of data will do in asynchronous / synchronous mode. By default is 'false'.

<b>ajaxErrorMessage</b>: Error message if the read/recovery of data fail. By default is 'Request failed'.

<b>dataRanking</b>: This parameter show the value of 'data-rank' property setted into every option of 'select tag'.

<b>datalistAttr</b>: This parameter is the field will to save the "select tag" name with the options.

<b>defaultMessage</b>: Message by default to use, for example, in 'placeholder' property o 'first option' of "select tag".

<b>defaultMessage</b>: Message by default to use, for example, in 'placeholder' property o 'first option' of "select tag".

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
    
        optionsDT.default_value = '0';
        optionsDT.value_selected_to = 'get_id';
        optionsDT.url = "pages/get.php";
        $('#select').dataList(optionsDT);
```

For more information on web design and development don't leave to visit <a target="_blank"  href="http://www.islavisual.com/articulos/desarrollo_web/">islavisual.com</a>.
