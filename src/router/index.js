import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';

import General from '@/components/general/General';
import GenStat from '@/components/general/stat/GenStat';
import GenDamage from '@/components/general/damage/GenDamage';
import GenGuild from '@/components/general/guild/GenGuild';


import Text from '@/components/Text';
import UiStrings from '@/components/uistrings/UiStrings';
import UiStringBrowse from '@/components/uistrings/UiStringBrowse';
import UiStringMidLup from '@/components/uistrings/UiStringMidLup';

import NotFound from '@/components/NotFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/general',
      component: General,
      children: [
        {
          path: '',
          redirect: 'stat'
        },
        {
          path: 'stat/:statName?',
          component: GenStat,
        },
        {
          path: 'damage',
          component: GenDamage,
        },
        {
          path: 'guild',
          component: GenGuild,
        },
        {
          path: '*',
          component: NotFound
        }
      ]
    },
    {
      path: '/text',
      component: Text,
      children: [
        {
          path: 'uistring',
          component: UiStrings,
          children: [
            {
              path: '',
              redirect: 'browse'
            },
            {
              path: 'browse',
              component: UiStringBrowse
            },
            {
              path: 'midlup',
              component: UiStringMidLup
            },
            {
              path: '*',
              component: NotFound
            }
          ]
        },
        {
          path: '',
          redirect: 'uistring'
        },
        {
          path: 'server',
          redirect: '/text/uistring'  //  TODO
        },
        {
          path: 'prohibit',
          redirect: '/text/uistring'  //  TODO
        },
        {
          path: '*',
          component: NotFound
        }
      ]
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
