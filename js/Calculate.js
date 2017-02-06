/**
 * Created by huyiqing on 16/11/17.
 */

//数组用于记录按键输入事件
var arr = new Array();
//判断是否为小数初始值为false
var dot = false;
//记录小数点位置
var point;
//记录当前值
var temp;
var tempDec;
//boolean判断是否正在计算过程中
var calculating = false;
//判断正负号点击次数
var negative = 0;
//用于存储数值和运算符号
var numbers = new Array();
var operators = new Array();
//存储运算结果
var calResult =0;
//绑定事件
var resultNum = document.getElementById('resultNum');

//传入参数方法
function setResult(result){
    resultNum.innerHTML = result;
}

//点击数字后判断并记录
function setClickedNum(num){
    var result = 0;
    var dec = 0;
    if(calculating){
        arr = new Array();
        calculating = false;
    }
    arr.push(num);
    setSize();
    acToC("C");
    if(dot == false) {
        for (var i = 0; i < arr.length; i++) {
            var pow = arr.length - 1 - i;
            result += Math.pow(10, pow) * arr[i];
        }
        temp = result;
        setResult(result);
    }else {
        for (var i = point; i < arr.length; i++) {
            var pow = arr.length - 1 - i;
            dec += Math.pow(10, pow) * arr[i];
        }
        tempDec = temp + "." + dec;
        setResult(temp + "." + dec);

    }
}

//调整ac按键显示
function acToC(set){
    document.getElementById('operatorClear').innerHTML = set;
}

//清除所有
function clearAll(){
    arr = new Array();
    temp = null;
    tempDec = null;
    dot=false;
    resultNum.style.fontSize = "56px";
    setResult(0);
    acToC("AC");
}

//添加小数点
function setDot(){
    if(dot==false) {
        dot = true;
        point = arr.length;
        setResult(temp + ".");
    }else {
        alert("输入错误!")
    }
}

//根据数据长度动态调整字体大小
function setSize(){
    var size = 56;
    var length = arr.length;
    var i = 7;
    while(length > i && size > 20){
        size -= 20;
        length -= i;
        i -=3;
    }
    resultNum.style.fontSize = size +"px";
}

//运算符号点击检测并将输入参数传入数组
function setOperation(op){
    calculating = true;
    dot = false;
    operators.push(op);
    if (op == 5 || op == 6 || op == 7 || op == 8){
        getResult();
    }else {
        numbers.push(resultNum.innerHTML);
    }
}

//设置数据正负
function setNegative(){
    var pos = resultNum.innerHTML;
    negative ++;
    if (negative%2 != 0){
        resultNum.innerHTML = "-" + pos;
    } else if(parse(pos) < 0){
        resultNum.innerHTML = pos * (-1);
    }
}

//初始化所有数据
function initData(){
    arr = new Array();
    temp = null;
    tempDec = null;
    dot=false;
    numbers = new Array();
    operators = new Array();
}

//计算并打印运算结果
function getResult(){
    numbers.push(resultNum.innerHTML);
    switch (operators[0]) {
        case 0:
            calResult = parse(numbers[0]) + parse(numbers[1]);
            break;
        case 1:
            calResult = parse(numbers[0]) - parse(numbers[1]);
            break;
        case 2:
            calResult = parse(numbers[0]) * parse(numbers[1]);
            break;
        case 3:
            if (parse(numbers[1]) != 0) {
            calResult = parse(numbers[0]) / parse(numbers[1]);
            } else {
                alert("除数不能为零");
                calResult = "NaN";
            }
            break;
        case 4:
            calResult = parse(numbers[0]) % parse(numbers[1]);
            break;
        case 5:
            calResult = Math.sin(numbers[0]);
            break;
        case 6:
            calResult = Math.cos(numbers[0]);
            break;
        case 7:
            if(numbers[0]>= 0) {
                calResult = Math.sqrt(numbers[0]);
            } else {
                alert("不能给负数开根");
                calResult = "NaN";
            }
            break;
        case 8:
            calResult = 1 / parse(numbers[0]);
            break;
    }
    if (Math.floor(calResult) === calResult){
        setResult(parse(calResult));
        setResultSize(calResult);
    } else if (calResult == "NaN"){
        setResult(calResult);
    }
    else {
        setResult(parse(calResult.toFixed(6)));
    }
    initData();
}

function setResultSize(cal){
    var size = 56;
    var length = cal.toString().length;
    var i = 7;
    while(length > i && size > 20){
        size -= 20;
        length -= i;
        i -=3;
    }
    resultNum.style.fontSize = size +"px";

}

//自动判断数据类型并适当转换字符串为数字
function parse(numArr){
    if(Math.floor(numArr) === numArr){
        return parseInt(numArr);
    }else{
        return parseFloat(numArr);
    }
}