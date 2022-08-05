function Bubble(arrstr) {
     var arry = arrstr.split(" ");
     var arr = [];
     for (let ind = 0; ind < arry.length; ind++)
          arr.push(parseInt(arry[ind]));
     var ListOfDataSets = [];
     var i, j, flag;
     for (i = arr.length - 1; i > 0; i--) {
          flag = true;
          for (j = arr.length - 1; j >= arr.length - i; j--) {
               ListOfDataSets.push(createBubble(arr, arr.length - i - 1, j));
               if (arr[j] < arr[j - 1]) {
                    [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                    flag = false;
                    ListOfDataSets.push(createBubble(arr, arr.length - i - 1, j));
               }
          }
          if (flag)
               break;
     }
     ListOfDataSets.push(createBubble(arr, arr.length, -1));
     document.getElementById("sorted").innerHTML = "Sorted array is : " + arr;
     setTimeout(function () {
          document.getElementsByName("visuals")[0].style.visibility = "visible";
     }, 1000);
     var ind = 0;
     let repeat = setInterval(function () {
          drawchart(ListOfDataSets[ind++], "Bubble");
          if (ind >= ListOfDataSets.length)
               clearInterval(repeat);
     }, 1000);
}

function createBubble(arr, ind, curr) {
     var listOfDicts = [];
     for (let i = 0; i < arr.length; i++) {
          if (i == curr || i == curr - 1) {
               var dict = { x: i + 1, y: arr[i], label: arr[i], color: "#eb3f28", indexLabel: "\u2193" };
               listOfDicts.push(dict);//Current Comparision
          }
          else if (i >= ind) {
               var dict = { x: i + 1, y: arr[i], label: arr[i], color: "#d8e8ed" };//Unsorted
               listOfDicts.push(dict);
          }
          else {
               var dict = { x: i + 1, y: arr[i], label: arr[i], color: "#6ceb78" };//Sorted
               listOfDicts.push(dict);
          }
     }
     return listOfDicts;
}
function drawchart(datapts) {
     var chart = new CanvasJS.Chart("chartcontainer",
          {
               title: { text: "Bubble" },
               axisY: { includeZero: true },
               data: [{ type: "column", indexLabelFontColor: "#8A32B8", indexLabelPlacement: "outside", dataPoints: datapts }]
          });

     chart.render();
}

document.getElementById("bubble").onclick = function () { Bubble(document.getElementById("input_array").value) };