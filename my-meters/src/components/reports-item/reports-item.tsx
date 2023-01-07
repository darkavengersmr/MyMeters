import { Card, CardContent, Typography } from "@mui/material"
import Box from "@mui/material/Box";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { dateTransform, getColorByMeterTitle } from "../../helpers/helpers";

import { IMeter } from "../../models/interfaces"

type ReportsItemProps = {
    meter: IMeter
    limit: number
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function ReportsItem({meter, limit}: ReportsItemProps) {    

    const labels = meter.values.map(value => dateTransform(value.date).slice(0,5))

    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: meter.values.map(value => value.value),
            borderColor: getColorByMeterTitle(meter.title),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
            display: false,
          },
          title: {
            display: false,
            text: meter.title,
          },
        },
      };

    return <>
            <Card variant="outlined" sx={{ mb: 2, minWidth: 320, p: 1 }}>
                <Typography sx={{ mt: 0, mb: 0}} variant="body2" textAlign='center'>
                    {meter.title}
                </Typography>
                
                    <Line options={options} data={data} />                
                
                
            </Card>

    </>

}

export default ReportsItem