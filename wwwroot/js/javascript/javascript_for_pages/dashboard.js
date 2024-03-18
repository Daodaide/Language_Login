(function ($) {
    "use strict";
    $(function () {
        // Remove pro banner on close
        document.addEventListener("DOMContentLoaded", function () {
            // Bạn có thể thêm các đoạn mã JavaScript khác ở đây nếu cần

            // Thêm bộ lắng nghe sự kiện click cho nút đóng banner
            var bannerCloseButton = document.querySelector("#bannerClose");
            if (bannerCloseButton) {
                bannerCloseButton.addEventListener("click", function () {
                    var proBanner = document.querySelector("#proBanner");
                    if (proBanner) {
                        proBanner.classList.add("d-none");
                    }
                });
            }
        });
        if ($("#circleProgress6").length) {
            var progressValue = parseFloat($("#circleProgress6").data("progress")); // Lấy giá trị tiến độ từ data-attributes

            var bar = new ProgressBar.Circle(circleProgress6, {
                color: "#001737",
                strokeWidth: 10,
                trailWidth: 10,
                easing: "easeInOut",
                duration: 1400,
                text: {
                    autoStyleContainer: false,
                },
                from: {
                    color: "#aaa",
                    width: 10,
                },
                to: {
                    color: "#2617c9",
                    width: 10,
                },
                step: function (state, circle) {
                    circle.path.setAttribute("stroke", state.color);
                    circle.path.setAttribute("stroke-width", state.width);

                    var value =
                        '<p class="text-center mb-0">Score</p>' +
                        Math.round(circle.value() * 100) +
                        "%";
                    if (value === 0) {
                        circle.setText("");
                    } else {
                        circle.setText(value);
                    }
                },
            });

            bar.text.style.fontSize = "1.875rem";
            bar.text.style.fontWeight = "700";
            bar.animate(progressValue); // Sử dụng giá trị tiến độ từ data-attributes
        }
        if ($("#circleProgress7").length) {
            var bar = new ProgressBar.Circle(circleProgress7, {
                color: "#9c9fa6",
                // This has to be the same size as the maximum width to
                // prevent clipping
                strokeWidth: 10,
                trailWidth: 10,
                easing: "easeInOut",
                trailColor: "#1f2130",
                duration: 1400,
                text: {
                    autoStyleContainer: false,
                },
                from: {
                    color: "#aaa",
                    width: 10,
                },
                to: {
                    color: "#2617c9",
                    width: 10,
                },
                // Set default step function for all animate calls
                step: function (state, circle) {
                    circle.path.setAttribute("stroke", state.color);
                    circle.path.setAttribute("stroke-width", state.width);

                    var value =
                        '<p class="text-center mb-0">Score</p>' +
                        Math.round(circle.value() * 100) +
                        "%";
                    if (value === 0) {
                        circle.setText("");
                    } else {
                        circle.setText(value);
                    }
                },
            });

            bar.text.style.fontSize = "1.875rem";
            bar.text.style.fontWeight = "700";
            bar.animate(0.75); // Number from 0.0 to 1.0
        }

        if ($("#eventChart").length) {
            var lineChartCanvas = $("#eventChart").get(0).getContext("2d");

            // Lấy dữ liệu từ data-attributes
            var labels = $("#eventChart").data("labels").split(",");
            var criticalData = $("#eventChart").data("critical-data").split(",").map(Number);
            var errorData = $("#eventChart").data("error-data").split(",").map(Number);
            var warningData = $("#eventChart").data("warning-data").split(",").map(Number);

            var eventData = {
                labels: labels,
                datasets: [
                    {
                        label: "Critical",
                        data: criticalData,
                        backgroundColor: "rgba(255, 131, 0, 0.1)",
                        borderColor: "rgba(255, 131, 0)",
                        borderWidth: 1,
                        fill: true,
                    },
                    {
                        label: "Error",
                        data: errorData,
                        backgroundColor: "rgba(242, 18, 38, 0.1)",
                        borderColor: "rgba(242, 18, 38)",
                        borderWidth: 1,
                        fill: true,
                    },
                    {
                        label: "Warning",
                        data: warningData,
                        backgroundColor: "rgba(23, 23, 201, 0.1)",
                        borderColor: "rgba(23, 23, 201)",
                        borderWidth: 1,
                        fill: true,
                    },
                ],
            };

            var eventOptions = {
                scales: {
                    yAxes: [
                        {
                            display: false,
                        },
                    ],
                    xAxes: [
                        {
                            display: false,
                            position: "bottom",
                            gridLines: {
                                drawBorder: false,
                                display: true,
                            },
                            ticks: {
                                display: false,
                                beginAtZero: true,
                                stepSize: 10,
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                    labels: {
                        boxWidth: 0,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        tension: 0.1,
                    },
                },
                tooltips: {
                    backgroundColor: "rgba(2, 171, 254, 1)",
                },
            };

            var saleschart = new Chart(lineChartCanvas, {
                type: "line",
                data: eventData,
                options: eventOptions,
            });
        }
        if ($("#salesanalyticChart").length) {
            // Lấy context của canvas
            var lineChartCanvas = $("#salesanalyticChart").get(0).getContext("2d");

            // Lấy dữ liệu từ các data-attributes của canvas
            var labels = $("#salesanalyticChart").data("labels").split(",");
            var criticalData = $("#salesanalyticChart").data("critical-data").split(",").map(Number);
            var warningData = $("#salesanalyticChart").data("warning-data").split(",").map(Number);
            var errorData = $("#salesanalyticChart").data("error-data").split(",").map(Number);

            // Tạo đối tượng dữ liệu cho biểu đồ
            var salesanalyticData = {
                labels: labels,
                datasets: [{
                    label: "Critical",
                    data: criticalData,
                    borderColor: "#3022cb",
                    borderWidth: 3,
                    fill: false,
                }, {
                    label: "Warning",
                    data: warningData,
                    borderColor: "#ff8300",
                    borderWidth: 3,
                    fill: false,
                }, {
                    label: "Error",
                    data: errorData,
                    borderColor: "#f2125e",
                    borderWidth: 3,
                    fill: false,
                }],
            };

            // Cài đặt các tùy chọn cho biểu đồ
            var salesanalyticOptions = {
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            drawBorder: false,
                            display: true,
                        },
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            stepSize: 5,
                        },
                    }],
                    xAxes: [{
                        display: true,
                        position: "bottom",
                        gridLines: {
                            drawBorder: false,
                            display: false,
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            stepSize: 5,
                        },
                    }],
                },
                legend: {
                    display: false,
                    labels: {
                        boxWidth: 0,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        tension: 0.4,
                    },
                },
                tooltips: {
                    backgroundColor: "rgba(2, 171, 254, 1)",
                },
            };

            // Tạo biểu đồ sử dụng dữ liệu và tùy chọn đã thiết lập
            var saleschart = new Chart(lineChartCanvas, {
                type: "line",
                data: salesanalyticData,
                options: salesanalyticOptions,
            });
        }
        if ($("#barChartStacked").length) {
            // Lấy context của canvas
            var barChartCanvas = $("#barChartStacked").get(0).getContext("2d");

            // Lấy dữ liệu từ các data-attributes của canvas
            var labels = $("#barChartStacked").data("labels").split(",");
            var safariData = $("#barChartStacked").data("safari-data").split(",").map(Number);
            var chromeData = $("#barChartStacked").data("chrome-data").split(",").map(Number);

            // Tạo đối tượng dữ liệu cho biểu đồ
            var barChartStackedData = {
                labels: labels,
                datasets: [{
                    label: "Safari",
                    data: safariData,
                    backgroundColor: "#2b80ff",
                    borderColor: "#2b80ff",
                    borderWidth: 1,
                    fill: false,
                }, {
                    label: "Chrome",
                    data: chromeData,
                    backgroundColor: "#bfccda",
                    borderColor: "#bfccda",
                    borderWidth: 1,
                    fill: false,
                }],
            };

            // Cài đặt các tùy chọn cho biểu đồ
            var barChartStackedOptions = {
                scales: {
                    xAxes: [{
                        display: false,
                        stacked: true,
                        gridLines: {
                            display: false,
                        },
                    }],
                    yAxes: [{
                        stacked: true,
                        display: false,
                    }],
                },
                legend: {
                    display: false,
                    position: "bottom",
                },
                legendCallback: function (chart) {
                    var text = [];
                    text.push('<div class="row">');
                    for (var i = 0; i < chart.data.datasets.length; i++) {
                        text.push('<div class="col-sm-5 mr-3 ml-3 ml-sm-0 mr-sm-0 pr-md-0 mt-3"><div class="row align-items-center"><div class="col-2"><span class="legend-label" style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span></div><div class="col-9"><p class="text-dark m-0">' + chart.data.datasets[i].label + "</p></div></div>");
                        text.push("</div>");
                    }
                    text.push("</div>");
                    return text.join("");
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                },
            };

            // Tạo biểu đồ sử dụng dữ liệu và tùy chọn đã thiết lập
            var barChart = new Chart(barChartCanvas, {
                type: "bar",
                data: barChartStackedData,
                options: barChartStackedOptions,
            });
        }
        var barChartStackedDarkData = {
            labels: [
                "jan",
                "feb",
                "mar",
                "apr",
                "may",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
            datasets: [
                {
                    label: "Safari",
                    data: [10, 20, 15, 30, 20, 10, 20, 15, 30, 20, 10, 20],
                    backgroundColor: [
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                    ],
                    borderColor: [
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                        "#2b80ff",
                    ],
                    borderWidth: 1,
                    fill: false,
                },
                {
                    label: "Chrome",
                    data: [5, 25, 10, 20, 30, 5, 25, 10, 20, 30, 25, 10],
                    backgroundColor: [
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                    ],
                    borderColor: [
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                        "#1f2130",
                    ],
                    borderWidth: 1,
                    fill: false,
                },
            ],
        };
        var barChartStackedDarkOptions = {
            scales: {
                xAxes: [
                    {
                        display: false,
                        stacked: true,
                        gridLines: {
                            display: false, //this will remove only the label
                        },
                    },
                ],
                yAxes: [
                    {
                        stacked: true,
                        display: false,
                    },
                ],
            },
            legend: {
                display: false,
                position: "bottom",
            },
            legendCallback: function (chart) {
                var text = [];
                text.push('<div class="row">');
                for (var i = 0; i < chart.data.datasets.length; i++) {
                    text.push(
                        '<div class="col-sm-5 mr-3 ml-3 ml-sm-0 mr-sm-0 pr-md-0 mt-3"><div class="row align-items-center"><div class="col-2"><span class="legend-label" style="background-color:' +
                        chart.data.datasets[i].backgroundColor[i] +
                        '"></span></div><div class="col-9"><p class="text-dark m-0">' +
                        chart.data.datasets[i].label +
                        "</p></div></div>"
                    );
                    text.push("</div>");
                }
                text.push("</div>");
                return text.join("");
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
        };

        if ($("#barChartStackedDark").length) {
            var barChartCanvas = $("#barChartStackedDark").get(0).getContext("2d");
            // This will get the first returned node in the jQuery collection.
            var barChart = new Chart(barChartCanvas, {
                type: "bar",
                data: barChartStackedDarkData,
                options: barChartStackedDarkOptions,
            });
        }

        if ($("#salesTopChart").length) {
            // Lấy context của canvas
            var graphGradient = document.getElementById("salesTopChart").getContext("2d");

            // Tạo gradient cho nền của biểu đồ
            var saleGradientBg = graphGradient.createLinearGradient(25, 0, 25, 110);
            saleGradientBg.addColorStop(0, "rgba(242,18,94, 1)");
            saleGradientBg.addColorStop(1, "rgba(255, 255, 255, 1)");

            // Lấy dữ liệu từ các data-attribute của canvas
            var labels = $("#salesTopChart").data("labels").split(",");
            var values = $("#salesTopChart").data("values").split(",").map(Number);

            // Tạo đối tượng dữ liệu cho biểu đồ
            var salesTopData = {
                labels: labels,
                datasets: [{
                    label: "# of Votes",
                    data: values,
                    backgroundColor: saleGradientBg,
                    borderColor: ["rgba(242,18,94)"],
                    borderWidth: 2,
                    fill: true,
                }],
            };

            // Cài đặt các tùy chọn cho biểu đồ
            var salesTopOptions = {
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: true,
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                        },
                    }],
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: true,
                            drawBorder: false,
                        },
                        ticks: {
                            beginAtZero: true,
                            maxTicksLimit: 4,
                            maxRotation: 360,
                            minRotation: 360,
                            padding: 10,
                        },
                    }],
                },
                legend: {
                    display: false,
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        tension: 0.1,
                    },
                },
                tooltips: {
                    backgroundColor: "rgba(31, 59, 179, 1)",
                },
            };

            // Tạo biểu đồ sử dụng dữ liệu và tùy chọn đã thiết lập
            var salesTop = new Chart(graphGradient, {
                type: "line",
                data: salesTopData,
                options: salesTopOptions,
            });
        }
        if ($("#ecommerceAnalytic").length) {
            // Lấy context của canvas
            var lineChartCanvas = $("#ecommerceAnalytic").get(0).getContext("2d");

            // Lấy dữ liệu từ các data-attributes của canvas
            var labels = $("#ecommerceAnalytic").data("labels").split(",");
            var criticalValues = $("#ecommerceAnalytic").data("critical-values").split(",").map(Number);
            var warningValues = $("#ecommerceAnalytic").data("warning-values").split(",").map(Number);

            // Tạo đối tượng dữ liệu cho biểu đồ
            var eCommerceAnalyticData = {
                labels: labels,
                datasets: [{
                    label: "Critical",
                    data: criticalValues,
                    borderColor: ["#392ccd"],
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: "rgba(242, 250, 247, .6)",
                }, {
                    label: "Warning",
                    data: warningValues,
                    borderColor: ["#17c964"],
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: "rgba(200, 200, 200,.5)",
                }],
            };

            // Cài đặt các tùy chọn cho biểu đồ
            var eCommerceAnalyticOptions = {
                scales: {
                    yAxes: [{
                        display: true,
                        gridLines: {
                            drawBorder: false,
                            display: true,
                        },
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            stepSize: 5,
                        },
                    }],
                    xAxes: [{
                        display: false,
                        position: "bottom",
                        gridLines: {
                            drawBorder: false,
                            display: false,
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            stepSize: 5,
                        },
                    }],
                },
                legend: {
                    display: false,
                    labels: {
                        boxWidth: 0,
                    },
                },
                elements: {
                    point: {
                        radius: 0,
                    },
                    line: {
                        tension: 0.4,
                    },
                },
                tooltips: {
                    backgroundColor: "rgba(2, 171, 254, 1)",
                },
            };

            // Tạo biểu đồ sử dụng dữ liệu và tùy chọn đã thiết lập
            var saleschart = new Chart(lineChartCanvas, {
                type: "line",
                data: eCommerceAnalyticData,
                options: eCommerceAnalyticOptions,
            });
        }
        var eCommerceAnalyticDarkData = {
            labels: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
                "31",
                "32",
                "33",
                "34",
                "35",
                "36",
                "37",
                "38",
                "39",
                "40",
                "41",
                "42",
                "43",
                "44",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
                "23",
                "24",
                "25",
                "26",
                "27",
                "28",
                "29",
                "30",
                "31",
                "32",
                "33",
                "34",
                "35",
                "36",
                "37",
                "38",
                "39",
                "40",
                "41",
            ],
            datasets: [
                {
                    label: "Critical",
                    data: [
                        56, 56, 55, 59, 59, 59, 57, 56, 57, 54, 56, 58, 57, 59, 58, 59, 57,
                        55, 56, 54, 52, 52, 50, 50, 50, 52, 48, 49, 50, 52, 53, 52, 55, 54,
                        53, 56, 55, 56, 55, 54, 55, 57, 58, 56, 55, 56, 57, 58, 59, 58, 57,
                        55, 53, 52, 55, 57, 55, 54, 52, 55, 57, 56, 57, 58, 59, 58, 59, 57,
                        56, 55, 57, 58, 59, 60, 62, 60, 59, 58, 57, 56, 57, 56, 58, 59,
                    ],
                    borderColor: ["#392ccd"],
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: "rgba(0, 0, 0, .2)",
                },
                {
                    label: "Warning",
                    data: [
                        32, 32, 35, 39, 39, 39, 37, 36, 37, 34, 36, 38, 37, 39, 38, 39, 37,
                        35, 36, 34, 30, 28, 31, 29, 27, 24, 23, 26, 25, 27, 28, 29, 32, 30,
                        33, 31, 35, 34, 32, 35, 37, 35, 36, 34, 30, 28, 28, 28, 32, 29, 33,
                        35, 33, 32, 35, 37, 35, 34, 32, 35, 37, 36, 37, 38, 39, 38, 39, 37,
                        36, 35, 37, 38, 39, 36, 37, 35, 39, 38, 37, 36, 37, 36, 38, 39,
                    ],
                    borderColor: ["#17c964"],
                    borderWidth: 3,
                    fill: true,
                    backgroundColor: "rgba(0, 0, 0,.3)",
                },
            ],
        };
        var eCommerceAnalyticDarkOptions = {
            scales: {
                yAxes: [
                    {
                        display: true,
                        gridLines: {
                            drawBorder: false,
                            display: true,
                        },
                        ticks: {
                            display: false,
                            beginAtZero: false,
                            stepSize: 5,
                        },
                    },
                ],
                xAxes: [
                    {
                        display: false,
                        position: "bottom",
                        gridLines: {
                            drawBorder: false,
                            display: false,
                        },
                        ticks: {
                            display: true,
                            beginAtZero: true,
                            stepSize: 5,
                        },
                    },
                ],
            },
            legend: {
                display: false,
                labels: {
                    boxWidth: 0,
                },
            },
            elements: {
                point: {
                    radius: 0,
                },
                line: {
                    tension: 0.4,
                },
            },
            tooltips: {
                backgroundColor: "rgba(2, 171, 254, 1)",
            },
        };
        if ($("#ecommerceAnalyticDark").length) {
            var lineChartCanvas = $("#ecommerceAnalyticDark").get(0).getContext("2d");
            var saleschart = new Chart(lineChartCanvas, {
                type: "line",
                data: eCommerceAnalyticDarkData,
                options: eCommerceAnalyticDarkOptions,
            });
        }
    });
})(jQuery);
