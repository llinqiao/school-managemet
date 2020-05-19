// 文档地址
// https://router.vuejs.org/zh-cn/
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/share/index/index';
import Story from '@/page/share/story/index';
import SayOrWrite from '@/page/share/say-or-write/index';
import CompleteQuestion from '@/page/share/complete-question/index';
// import Write from '@/page/write/index';

// 家长端
// import Parent from '@/page/parent/index';
// import ParentLogin from '@/page/parent/login/index';
// import ParentList from '@/page/parent/list/index';
// import ParentScore from '@/page/parent/score/index';
// import ParentDetail from '@/page/parent/detail/index';
// import ParentHomePage from '@/page/parent/home-page/index';
// import StudentEvaluation from '@/page/parent/student-evaluation';
// import GoStudentEvaluation from '@/page/parent/go-student-evaluation';
// import StudentEvaluationDetail from '@/page/parent/student-evaluation-detail';
// import ParentEvaluationDetail from '@/page/parent/parent-evaluation-detail';

// import ParentEvaluation from '@/page/parent/parent-evaluation';
// import GoParentEvaluation from '@/page/parent/go-parent-evaluation';
// import TestScore from '@/page/parent/test-score';
// import SchoolTestScore from '@/page/parent/school-test-score';
// import AddScore from '@/page/parent/add-score';
// import IntendedCustomer from '@/page/parent/intended-customer';
// import addIntended from '@/page/parent/add-intended';

//教师端
import Teacher from '@/page/teacher/index';
import TeacherLogin from '@/page/teacher/login/index';
import TeacherHomePage from '@/page/teacher/home-page/index';
import MySchedule from '@/page/teacher/my-schedule/index';
import EvaluationArea from '@/page/teacher/evaluation-area/index';
import EvaluationClassroom from '@/page/teacher/evaluation-classroom/index';
import EvaluationStudent from '@/page/teacher/evaluation-student/index';
import EvaluationColleague from '@/page/teacher/evaluation-colleague/index';
import EvaluationForMe from '@/page/teacher/evaluation-for-me/index';
import PayrollRecords from '@/page/teacher/payroll-records/index';
import TeacherPayrollDetail from '@/page/teacher/payroll-teacher-detail/index';
import EmplooyeePayrollDetail from '@/page/teacher/payroll-emplooyee-detail/index';
import TestScore from '@/page/teacher/test-score/index';
import TestScoreDetail from '@/page/teacher/test-score-detail/index';
import SchoolTestScore from '@/page/teacher/school-test-score/index';
import SchoolTestScoreDetail from '@/page/teacher/school-test-score-detail';
import AddScore from '@/page/teacher/add-score/index';
import Share from '@/page/teacher/add-intended/index';
// const Index = () => import('@/page/Index');

// 组件切片名称
// webpack 会将A、B、C三个组件打包到 group-word 文件中
// const A = () => import(/* webpackChunkName: "group-word" */ '@/page/A.vue');
// const B = () => import(/* webpackChunkName: "group-word" */ '@/page/B.vue');
// const C = () => import(/* webpackChunkName: "group-word" */ '@/page/C.vue');

Vue.use(Router);

// 保留访问页面的位置
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition 用于 popstate 导航
    return savedPosition;
  } else {
    const position = {};
    // 通过锚点返回位置
    if (to.hash) {
      position.selector = to.hash;
    }
    // 根据meta判断是不是回到页面的顶部
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }
    // 如果返回为空,保留原位置
    return position;
  }
};

export default new Router({
  // mode: 'history',
  mode: 'hash',
  scrollBehavior,
  routes: [
    /* 如果meta设置了keepAlive为true，则改组件会被缓存下来 */
    { path: '/', redirect: { path: '/teacher/homepage' } },
    { path: '/share', name: 'index', component: Index, meta: { title: '美柏', keepAlive: true } },
    {
      path: '/normal-story',
      name: 'normal_story',
      component: Story,
      meta: { title: '美柏', keepAlive: true },
    },
    {
      path: '/expand-story',
      name: 'expand_story',
      component: Story,
      meta: { title: '美柏', keepAlive: true },
    },
    {
      path: '/child-story',
      name: 'child_story',
      component: Story,
      meta: { title: '美柏', keepAlive: true },
    },
    {
      path: '/normal',
      name: 'sayorwrite_normal',
      component: SayOrWrite,
      meta: { title: '美柏' },
    },
    {
      path: '/expand',
      name: 'sayorwrite_expand',
      component: SayOrWrite,
      meta: { title: '美柏' },
    },
    {
      path: '/child',
      name: 'sayorwrite_child',
      component: SayOrWrite,
      meta: { title: '美柏' },
    },
    {
      path: '/normal-complete',
      name: 'complete_normal',
      component: CompleteQuestion,
      meta: { title: '美柏' },
    },
    {
      path: '/expand-complete',
      name: 'complete_expand',
      component: CompleteQuestion,
      meta: { title: '美柏' },
    },
    {
      path: '/child-complete',
      name: 'complete_child',
      component: CompleteQuestion,
      meta: { title: '美柏' },
    },
    // { path: '/write', name: 'write', component: Write, meta: { title: '写一写', keepAlive: true } },
    {
      path: '/teacher',
      name: 'teacher',
      component: Teacher,
      meta: { title: '美柏' },
      children: [
        {
          path: 'login',
          name: 'teacherLogin',
          component: TeacherLogin,
          meta: { title: '教师登录' },
        },
        {
          path: 'homepage',
          name: 'teacherHomePage',
          component: TeacherHomePage,
          meta: { title: '你好' },
        },
        {
          path: 'myschedule',
          name: 'mySchedule',
          component: MySchedule,
          meta: { title: '我的课表' },
        },
        {
          path: 'evaluationarea',
          name: 'evaluationarea',
          component: EvaluationArea,
          meta: { title: '评价专区' },
        },
        {
          path: 'evaluationclassroom',
          name: 'evaluationclassroom',
          component: EvaluationClassroom,
          meta: { title: '评价专区' },
        },
        {
          path: 'evaluationcolleague',
          name: 'evaluation-colleague',
          component: EvaluationColleague,
          meta: { title: '评价专区' },
        },
        {
          path: 'evaluationstudent',
          name: 'evaluationstudent',
          component: EvaluationStudent,
          meta: { title: '评价专区' },
        },
        {
          path: 'payrollrecords',
          name: 'payrollRecords',
          component: PayrollRecords,
          meta: { title: '工资记录' },
        },

        {
          path: 'teacherpayrolldetail',
          name: 'teacherpayrolldetail',
          component: TeacherPayrollDetail,
          meta: { title: '工资记录' },
        },

        {
          path: 'emplooyeepayrolldetail',
          name: 'emplooyeepayrolldetail',
          component: EmplooyeePayrollDetail,
          meta: { title: '工资记录' },
        },

        {
          path: 'evaluationforme',
          name: 'evaluationforme',
          component: EvaluationForMe,
          meta: { title: '学生/家长对我的评价' },
        },

        {
          path: 'evaluationforme',
          name: 'evaluationforme',
          component: EvaluationForMe,
          meta: { title: '学生/家长对我的评价' },
        },
        {
          path: 'testscore',
          name: 'testScore',
          component: TestScore,
          meta: { title: '美柏测试成绩' },
        },

        {
          path: 'testscoredetail',
          name: 'testScoreDetail',
          component: TestScoreDetail,
          meta: { title: '美柏测试成绩' },
        },
        {
          path: 'schooltestscore',
          name: 'schoolTestScore',
          component: SchoolTestScore,
          meta: { title: '公立学校成绩' },
        },

        {
          path: 'schooltestscoredetail',
          name: 'schoolTestScoreDetail',
          component: SchoolTestScoreDetail,
          meta: { title: '公立学校成绩' },
        },
        {
          path: 'addscore',
          name: 'addScore',
          component: AddScore,
          meta: { title: '添加成绩' },
        },

        {
          path: 'share',
          name: 'share',
          component: Share,
          meta: { title: '美柏英语' },
        },
        
      ],
    },
  ],
});
