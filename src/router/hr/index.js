import BaseRoute from "@/router/hr/BaseRoute";
import AttdRoute from "@/router/hr/AttdRoute";
import DayWorkerRoute from "@/router/hr/DayWorkerRoute";
import EmpRoute from "@/router/hr/EmpRoute";
import SalaryRoute from "@/router/hr/SalaryRoute";


const ERP = '/hr'
const insaRouter = [
   {
      path: `${ERP}/home`,
      name: 'home',
      component: () => import('@/views/hr/Home.vue'),
      meta: {
         pageTitle: 'Home',
         breadcrumb: [
            {
               text: 'Home',
               active: true,
            },
         ],
      },
   },
   ...BaseRoute,

]
export default insaRouter
