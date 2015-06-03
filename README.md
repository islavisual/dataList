# dataList
dataList is a jQuery plugin to make, easier and usable the use of drop down elements by adding predictive search, events management and styles 

Install
-------
```html
<script src="js/dataList.js"></script>
<link href="css/dataList.css?" rel="stylesheet">
```

How to use
----------
```html
      <select id="status" class="form-control" placeholder="Please, enter a choice"></select>
```
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
