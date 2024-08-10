<script lang="ts">
    import Card from "../Card.svelte";
    import Chart, { type ChartTypeRegistry } from "chart.js/auto";
    import { onMount } from "svelte";
    import { beautifyDate, dataByRange } from "$lib/backend/utils";
    import type { Period, Summary } from "$lib/backend/models";
    import { getConfig, Config, ChartType } from "$lib/backend/config";


    let chart;
    let canvas;
    let config: Config;
    export let title;
    export let property;
    export let period: Period;
    export let summary = [];

    $: period, summary, setData();
    export function setData() {
        if (chart) {
            const data = getData();
            chart.data.datasets[0] = data.datasets[0];
            chart.data.labels = data.labels;

            chart.options.scales.y = getChartArea(data);
            chart.update();
        }
    }

    function getChartArea(data) {
        const dataset = data.datasets[0].data;

        const minValue = Math.min(...dataset);
        const maxValue = Math.max(...dataset);
        const range = maxValue - minValue;
        const extraSpace = range * 0.4;

        let roundedMin = Math.round(minValue - extraSpace);
        let roundedMax = Math.round(maxValue + extraSpace);

        if (minValue - roundedMin < 10) {
            roundedMin = minValue - 10;
        }
        if (roundedMax - maxValue < 10) {
            roundedMax = maxValue + 10;
        }

        return {
            min: roundedMin,
            max: roundedMax,
        };
    }

    function getData() {
        let chartGradient;
        if (config && config?.chartType === ChartType.Line) {
            const ctx = canvas.getContext("2d");
            chartGradient = ctx.createLinearGradient(0, 0, 0, 400);
            chartGradient.addColorStop(0, "rgba(0,122,255,1)");
            chartGradient.addColorStop(1, "rgba(0,122,255,0)");
        } else {
            chartGradient = "#007aff";
        }

        const trimmedData: Summary[] = dataByRange(summary, period?.from, period?.to);

        const labels = trimmedData.map((item) => beautifyDate(item.date));

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: property,
                    data: trimmedData.map((item) => item[property]),
                    fill: true,
                    borderColor: "#007aff",
                    backgroundColor: chartGradient,
                    tension: 0.1,
                    borderRadius: 5,
                },
            ],
        };

        return chartData;
    }
    onMount(async () => {
        config = await getConfig();
        const data = getData();

        chart = new Chart(canvas, {
            type: config.chartType,
            data: data,
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: getChartArea(data),
                },
            },
        });
    });
</script>

<Card {title} class="span2">
    <div class="chart-container">
        <canvas bind:this={canvas}></canvas>
    </div>
</Card>


<style lang="scss">
    .chart-container {
        position: relative;
        width: 100% !important;
        height: 100% !important;
        min-height: 350px;
    }


    .type-selector{
        display: flex;
    }
</style>
