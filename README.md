# dataList 2.0.1
dataList is a jQuery plugin to make, easier and usable the use of drop down elements by adding predictive search, events management and styles. In addition, you can combine this plugin with the Bootstrap capabilities or another frameworks.

Is multilanguage, cross browser compatibility, very customizable and, by your design, is one of fastest of internet.

Examples
========
![ScreenShot](https://github.com/islavisual/dataList/blob/master/screenshot.png)

![ScreenShot](https://github.com/islavisual/dataList/blob/master/screenshot_2.png)

![ScreenShot](https://github.com/islavisual/dataList/blob/master/screenshot_3.png)

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
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
        </select>
    </div>
</div>

<script>
    $('#select').dataList();
</script>
```
__Basic Use with selected value__

```html
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <select id="select" class="form-control" placeholder="Please, enter a choice">
            <option value="a">Option A</option>
            <option value="b" selected="selected">Option B</option>
            <option value="c">Option C</option>
        </select>
    </div>
</div>

<script>
    $('#select').dataList();
</script>
```

Advanced Use
------------
__Set a default value attribute__

```html
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <select multiple id="languages" class="form-control" placeholder="Please, enter a choice">
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="es">Spain</option>
        </select>
    </div>
</div>

<script>
    $('#languages').dataList(default_value: 'es');
</script>
```

__Set a selected value through attribute__

```html
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <select multiple id="languages" class="form-control" placeholder="Please, enter a choice">
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="es">Spain</option>
        </select>
    </div>
</div>

<script>
    $('#languages').dataList(selected_value: 'en');
</script>
```

__DataList configuration with data ranking__
```html
<div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <select multiple id="colors" class="form-control" placeholder="Please, enter a choice">
            <option value="1" data-rank="2.5">Red</option>
            <option value="2" data-rank="4.0">Green</option>
            <option value="3" data-rank="5.0">Blue</option>
        </select>
    </div>
</div>

<script>
    $('#colors').dataList({ dataRanking: true, return_mask:'text' });
</script>
```

__DataList configuration of type multiple with custom parameters__
```html
<div class="row">
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
        <div class="form-group">
            <div>
                <select id="users" class="form-control" placeholder="Search" multiple>
                    <option value="1">User 1</option>
                    <option value="2">User 2</option>
                    <option value="3">User 3C</option>
                </select>
            </div>
        </div>
    </div>
</div>

<script>
    $('#users').dataList({parameterToSend:'q', return_mask:'value - text', multiple_class: 'form-control'});
</script>
```

__DataList configuration simulating a SELECT tag__
```html
<div class="row">
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
        <div class="form-group">
            <div>
                <input type="hidden" name="username" id="username" value="" />
                <select id="usernameList" class="form-control" placeholder="Search">
                    <option value="1">Paul</option>
                    <option value="2">John</option>
                    <option value="3">Clarise</option>
                </select>
            </div>
        </div>
    </div>
</div>

<script>
    $('#usernameList').dataList({return_mask:'text', value_selected_to:'username', clearOnFocus: true});
</script>
```

__Another configuration to value_selected_to__

_NOTE: To can use this option is necessary set "return_mask" property to 'value - text'._
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
                <select id="tasks" class="form-control" placeholder="Search">
                    <option value="1">Brainstorming</option>
                    <option value="2">Requirement taking</option>
                    <option value="3">Develop project</option>
                    <option value="4">Evaluate features</option>
                    <option value="5">Deliver to customer</option>
                </select>
            </div>
    </div>
</div>
<script>
    $('#tasks').dataList({value_selected_to: 'depends_id', return_mask: 'value - text'});
</script>
```

Methods
-------
__update__: Reset and update the DataList component. If dataList is "multiple" the sent value is must a object, anotherwise, the value must be string.
```javascript
// Datalist in single mode
$('#select').dataList('update', 'c');

// Datalist in multiple mode
$('#select').dataList('update', [{text: "Paul", value: '1'}, {text: "Helen", value: "2"}]);
```
__destroy__: Destroy object and restore to before of initialize the dataList
```javascript
$('#select').dataList('destroy');
```
__onChange__: To call to external function when the dataList value is changed.

Through to HTML
```html
<select id="tasks" class="form-control" placeholder="Search" onchange="callback()">...</select>
```
Or directly through plugin
```javascript
$('#select').dataList({onchange: 'callback()'});
```

Default messages
----------------
```javascript
// Define the values
var opt = $.extend({
    autoSelectable: false,
    addClassIfError:'error',
    ajax: false,
    ajaxErrorMessage:"Request failed",
    allowNewValues:false,
    clearOnFocus: false,
    dataRanking:false,
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
	loadingMessage: 'Loading...',
    method: "post",
    multiple_class:'',
    onChange: null,
    parameterToSend:"query",
    requiredMessage:'Please, enter at least one value',
    return_mask:"text",
    selected_value:"",
    url:"",
    value_selected_to:"",
    placeholder:('placeholder' in document.createElement("input"))
}, options );
```
Default messages Description
----------------------------
__autoSelectable__: To mark the first element automaticaly when the dataList takes focus.

__addClassIfError__: If an error is produced, is added this value to 'class' attribute. By default is "error".

__ajax__: This parameter indicates if the read/recovery of data will do in asynchronous / synchronous mode. By default is 'false'.

__ajaxErrorMessage__: Error message if the read/recovery of data fail. By default is 'Request failed'.

__allowNewValues__: This parameter allow to user insert new values when the data is not in the list. By default is 'false'.

__clearOnFocus__: This parameter set the value to empty when the focus event is invoked. When the blur event is invoked, if the value continues empty, the default value is restored.

__dataRanking__: This parameter show the value of 'data-rank' property setted into every option of 'select tag'. By default is 'false'.

__datalistAttr__: This parameter is the field will to save the "select tag" name with the options.

__defaultMessage__: Message by default to use, for example, in 'placeholder' property o 'first option' of "select tag".

__default_value__: Mark the one value by default when the dataList is empty.

__emptyMessage__: Message by default to use when no results found. By default is "No results found".

__error400__: Used into ajax mode. By default is "Server understood the request, but request content was invalid".

__error401__: Used into ajax mode. By default is "Unauthorized access".

__error403__: Used into ajax mode. By default is "Forbidden resource can\'t be accessed".

__error404__: Used into ajax mode. By default is "Not found".

__error500__: Used into ajax mode. By default is "Internal server error".

__error503__: Used into ajax mode. By default is "Service unavailable".

__errorAbort__: Used into ajax mode. By default is "Request was aborted by the server".

__errorParse__: Used into ajax mode. By default is "Parsing JSON request failed".

__errorTimeOut__: Used into ajax mode. By default is "Request time out".

__errorUnknown__: Used into ajax mode. By default is "Unknown error".

__loadingMessage__: To show a loading message while load all elements into dataList.

__method__: Used into ajax mode to define the method of recover file. Like possible options ar "get" or "post". By default is "post".

__multiple_class__: Used to add a CSS class to the results container into dataList of type multiple. By default is empty. If you use Bootstrap you can set this parameter to "form-control" to add the default styles.

__parameterToSend__: Used into ajax mode. When the Ajax mode is used, like parameter is sent this name. By default is "query". More later, from PHP for example, you can recover the value of this parameter through of $_REQUEST['query'].
```javascript 
var optionsDT = { parameterToSend: 'q' };
```

__requiredMessage__:  Message to indicates the field is required. By default is "Please, enter at least one value".

__return_mask__: This parameter indicates the values you want to show. There are two possible key options: 
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

__selected_value__: To select one value. After to initialize or through update method.

__url__: This parameter indicates the URL where data will recover and, more later, will inserted in 'select tag'. 

__value_selected_to__: This parameter is used to send the value property of 'select tag' to another field. For example if you want to sent only the ID of a input field inside a form, if you set like value the property the ID property of another element, when selects an option, the value will be copied to that target ID.

For more information on web design and development don't leave to visit <a target="_blank"  href="http://www.islavisual.com/articulos/desarrollo_web/">islavisual.com</a>.
