<template>
  <div class="mv-list-component">
    <swipe class="my-swipe" :auto="auto">
      <swipe-item class="slide" v-for="item in bannerList">
        <img class="slide-img" :src="item.pic">
      </swipe-item>
    </swipe>

    <div class="center-link clearfix">
      <div>
        <span><i class="icon dj-type"></i>电台分类</span>
      </div>
      <div>
        <span><i class="icon dj-rank"></i>电台排行</span>
      </div>
    </div>

    <cateTitle :title="'电台个性推荐'"></cateTitle>
    <DjList class="clearfix"></DjList>

    <section class="clearfix" v-bind:key="DJ.id"  v-for="DJ in HotList">
      <cateTitle class="clearfix" :title="DJ.name"></cateTitle>
      <ul class="dj-type-list clearfix">
        <li v-if="index<3" v-for="item ,index in DJ.list">
          <img v-bind:src="item.picUrl">
          <p>{{item.name}}</p>
        </li>
      </ul>
    </section>


    <cateTitle :title="'热门分类'"></cateTitle>
    <div class="dj-link clearfix">
      <div class="dj-type-item" v-for="item in DjTypeList.hot">

          <img v-bind:src="item.pic56x56Url"><span>{{item.name}}</span>

      </div>
    </div>

    <cateTitle :title="'更多分类'"></cateTitle>
    <div class="dj-link clearfix">
      <div class="dj-type-item" v-for="item in DjTypeList.more">

          <img v-bind:src="item.pic56x56Url"><span style="display: inline-block">{{item.name}}</span>

      </div>
    </div>

   </div>




</template>

<script>
  import cateTitle from '../common/CateTitle.vue'
  import DjList from '../common/DjList.vue'
  import { Swipe, SwipeItem } from 'vue-swipe'
  import * as DjTypeJson from '../../../static/djType.json'
  import axios from 'axios';
  import API from '../../api';
  const api=new API();
  export default{
    data () {
      return {
        bannerList:[
           {pic:"http://img.taihuwang.com/uploads/zixun/20170331/bn53cblizqm.jpg"},
           {pic:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1494047394952&di=52f73bc609ef2d9518cbcb88d8083cbe&imgtype=0&src=http%3A%2F%2Fwanzao2.b0.upaiyun.com%2Fsystem%2Fseries%2Ficons%2F1774%2Foriginal%2F%25E6%259A%25B4%25E8%25B5%25B0%25E5%25A4%25A7%25E4%25BA%258B%25E4%25BB%25B63%25E5%25AD%25A3.png"},
         ],
        auto:5000,
        HotList:[

        ],
        DjTypeList:{
          "hot": [
            {
              "picPCBlack": 3408486050376656,
              "picWeb": 3222668581755758,
              "picPCWhite": 3408486050376656,
              "pic96x96Id": 6637751697805070,
              "pic56x56Id": 18734578627472516,
              "pic84x84Id": 18734578627472516,
              "picIPad": 18598239184123308,
              "picUWPUrl": "http://p1.music.126.net/FrTcs-XEtxGezzC0Jov02Q==/3426078237139268.jpg",
              "picIPadStr": "18598239184123307",
              "picIPadUrl": "http://p1.music.126.net/Cn0NdEjRcdf_Bm8kS8L1Xg==/18598239184123307.jpg",
              "pic56x56IdStr": "18734578627472515",
              "pic56x56Url": "http://p1.music.126.net/7wnqBKKPEme-Fw0WGok8bA==/18734578627472515.jpg",
              "pic96x96IdStr": "6637751697805070",
              "pic96x96Url": "http://p1.music.126.net/AiIlwwzSk-8vAT__bN_nCg==/6637751697805070.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/7wnqBKKPEme-Fw0WGok8bA==/18734578627472515.jpg",
              "picPCWhiteStr": "3408486050376656",
              "picPCWhiteUrl": "http://p1.music.126.net/Zdm0iQJtXsdlS6c9WHzrNQ==/3408486050376656.jpg",
              "picPCBlackStr": "3408486050376656",
              "picPCBlackUrl": "http://p1.music.126.net/Zdm0iQJtXsdlS6c9WHzrNQ==/3408486050376656.jpg",
              "picWebStr": "3222668581755758",
              "picWebUrl": "http://p1.music.126.net/2zouR1PWqoliCoicelZFSg==/3222668581755758.jpg",
              "picMacId": "3385396308501582",
              "picMacUrl": "http://p1.music.126.net/Lq6V2OQgjp2C2VzuEactyw==/3385396308501582.jpg",
              "picUWPId": "3426078237139268",
              "name": "创作|翻唱",
              "id": 2001
            },
            {
              "picPCBlack": 528865136541803,
              "picWeb": 3223768093383533,
              "picPCWhite": 528865136541803,
              "pic96x96Id": 2582752813662830,
              "pic56x56Id": 18734578627472520,
              "pic84x84Id": 18734578627472520,
              "picIPad": 1396379782977029,
              "picUWPUrl": "http://p1.music.126.net/W4ViO51EJgHN05mmlqKUWQ==/3420580683529787.jpg",
              "picIPadStr": "1396379782977029",
              "picIPadUrl": "http://p1.music.126.net/y5yWmUsgbA_IKxSFq403Yg==/1396379782977029.jpg",
              "pic56x56IdStr": "18734578627472521",
              "pic56x56Url": "http://p1.music.126.net/bTt0cXC2OunCaiq_rSfOHg==/18734578627472521.jpg",
              "pic96x96IdStr": "2582752813662830",
              "pic96x96Url": "http://p1.music.126.net/FNOUfmKZVFkxEnxST2gLMg==/2582752813662830.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/bTt0cXC2OunCaiq_rSfOHg==/18734578627472521.jpg",
              "picPCWhiteStr": "528865136541803",
              "picPCWhiteUrl": "http://p1.music.126.net/lpT5w9JEZyy0h3h4JF5qgw==/528865136541803.jpg",
              "picPCBlackStr": "528865136541803",
              "picPCBlackUrl": "http://p1.music.126.net/lpT5w9JEZyy0h3h4JF5qgw==/528865136541803.jpg",
              "picWebStr": "3223768093383533",
              "picWebUrl": "http://p1.music.126.net/RuluBZUC94KRYjx0eF7aHQ==/3223768093383533.jpg",
              "picMacId": "2882919492026636",
              "picMacUrl": "http://p1.music.126.net/0YsrBhbOPdwzoI9EGWXhxg==/2882919492026636.jpg",
              "picUWPId": "3420580683529787",
              "name": "情感调频",
              "id": 3
            },
            {
              "picPCBlack": 2532175282873523,
              "picWeb": 3236962232922745,
              "picPCWhite": 2532175282873523,
              "pic96x96Id": 6636652185840044,
              "pic56x56Id": 18745573743758776,
              "pic84x84Id": 18745573743758776,
              "picIPad": 18515775812052396,
              "picUWPUrl": "http://p1.music.126.net/qVZ4pGWsGZgUCTkqk9FIMw==/2946691170767181.jpg",
              "picIPadStr": "18515775812052397",
              "picIPadUrl": "http://p1.music.126.net/zyjErzc7z0aJ22yJ9PUyhQ==/18515775812052397.jpg",
              "pic56x56IdStr": "18745573743758776",
              "pic56x56Url": "http://p1.music.126.net/1pE6qDar8XWs-FJacpZWlw==/18745573743758776.jpg",
              "pic96x96IdStr": "6636652185840044",
              "pic96x96Url": "http://p1.music.126.net/TAC4P1LGZ1QOHHXe3wqdYg==/6636652185840044.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/1pE6qDar8XWs-FJacpZWlw==/18745573743758776.jpg",
              "picPCWhiteStr": "2532175282873523",
              "picPCWhiteUrl": "http://p1.music.126.net/tfglu6miz2bOUOB9rxHKCg==/2532175282873523.jpg",
              "picPCBlackStr": "2532175282873523",
              "picPCBlackUrl": "http://p1.music.126.net/tfglu6miz2bOUOB9rxHKCg==/2532175282873523.jpg",
              "picWebStr": "3236962232922745",
              "picWebUrl": "http://p1.music.126.net/QdPlGPCPc-QDdaIKuVq3RQ==/3236962232922745.jpg",
              "picMacId": "528865136541790",
              "picMacUrl": "http://p1.music.126.net/CZQhSZIA7cA1qk6UCmGcUA==/528865136541790.jpg",
              "picUWPId": "2946691170767181",
              "name": "脱口秀",
              "id": 5
            },
            {
              "picPCBlack": 1364493985408457,
              "picWeb": 528865152721621,
              "picPCWhite": 1364493985408457,
              "pic96x96Id": 18669707440381044,
              "pic56x56Id": 18716986441432252,
              "pic84x84Id": 18716986441432252,
              "picIPad": 3442570917356877,
              "picUWPUrl": "http://p1.music.126.net/H96UXiRSiYkxrzCzHYen4A==/3426078237139269.jpg",
              "picIPadStr": "3442570917356877",
              "picIPadUrl": "http://p1.music.126.net/bwvaoX7NwezBGACUi1NI1w==/3442570917356877.jpg",
              "pic56x56IdStr": "18716986441432253",
              "pic56x56Url": "http://p1.music.126.net/noDl6W9BLTlCMhg8J6qXpw==/18716986441432253.jpg",
              "pic96x96IdStr": "18669707440381043",
              "pic96x96Url": "http://p1.music.126.net/VfIGN1Od33BR_R87dsAkCQ==/18669707440381043.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/noDl6W9BLTlCMhg8J6qXpw==/18716986441432253.jpg",
              "picPCWhiteStr": "1364493985408457",
              "picPCWhiteUrl": "http://p1.music.126.net/0ULg2pq49lBPk50TJ2wmuA==/1364493985408457.jpg",
              "picPCBlackStr": "1364493985408457",
              "picPCBlackUrl": "http://p1.music.126.net/0ULg2pq49lBPk50TJ2wmuA==/1364493985408457.jpg",
              "picWebStr": "528865152721621",
              "picWebUrl": "http://p1.music.126.net/gMSEEyNi20tdHSt_q8bt3w==/528865152721621.jpg",
              "picMacId": "3295236358855903",
              "picMacUrl": "http://p1.music.126.net/JMJc0guQaSNcj2_5wFh_wA==/3295236358855903.jpg",
              "picUWPId": "3426078237139269",
              "name": "有声书",
              "id": 10001
            },
            {
              "picPCBlack": 2534374306555365,
              "picWeb": 3242459791054876,
              "picPCWhite": 2534374306555365,
              "pic96x96Id": 2549767464830049,
              "pic56x56Id": 18813743464683690,
              "pic84x84Id": 18813743464683690,
              "picIPad": 3432675312738093,
              "picUWPUrl": "http://p1.music.126.net/0lf-05OOk8V1OzHqPjTP8g==/1406275383011705.jpg",
              "picIPadStr": "3432675312738093",
              "picIPadUrl": "http://p1.music.126.net/9qsNmqnIE_IW4Iknkr-cDw==/3432675312738093.jpg",
              "pic56x56IdStr": "18813743464683688",
              "pic56x56Url": "http://p1.music.126.net/tgqpoiMMn7qD2JGeKC4Jtg==/18813743464683688.jpg",
              "pic96x96IdStr": "2549767464830049",
              "pic96x96Url": "http://p1.music.126.net/dydQs380N8qTb8oXg6XPaw==/2549767464830049.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/tgqpoiMMn7qD2JGeKC4Jtg==/18813743464683688.jpg",
              "picPCWhiteStr": "2534374306555365",
              "picPCWhiteUrl": "http://p1.music.126.net/XkP9S8a2F3m54OzWztT68A==/2534374306555365.jpg",
              "picPCBlackStr": "2534374306555365",
              "picPCBlackUrl": "http://p1.music.126.net/XkP9S8a2F3m54OzWztT68A==/2534374306555365.jpg",
              "picWebStr": "3242459791054876",
              "picWebUrl": "http://p1.music.126.net/fNsFzMtgDByvOnpA0Kfehg==/3242459791054876.jpg",
              "picMacId": "6652045349696804",
              "picMacUrl": "http://p1.music.126.net/HG6j6Wild1a0uLpkena3cg==/6652045349696804.jpg",
              "picUWPId": "1406275383011705",
              "name": "音乐故事",
              "id": 2
            },
            {
              "picPCBlack": 3298534891174687,
              "picWeb": 3242459791054879,
              "picPCWhite": 3298534891174687,
              "pic96x96Id": 2582752813662840,
              "pic56x56Id": 18734578627472516,
              "pic84x84Id": 18734578627472516,
              "picIPad": 3416182641225602,
              "picUWPUrl": "http://p1.music.126.net/S9DidTCM5kHdFBQGPNnUDg==/1407374894639481.jpg",
              "picIPadStr": "3416182641225602",
              "picIPadUrl": "http://p1.music.126.net/HRsI0qfeQ9ATeHdZQIsfuA==/3416182641225602.jpg",
              "pic56x56IdStr": "18734578627472517",
              "pic56x56Url": "http://p1.music.126.net/w-k_hOvxAoSRynKNuvK2TA==/18734578627472517.jpg",
              "pic96x96IdStr": "2582752813662840",
              "pic96x96Url": "http://p1.music.126.net/ChdTTZz7kp5cp_DV4gsvcg==/2582752813662840.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/w-k_hOvxAoSRynKNuvK2TA==/18734578627472517.jpg",
              "picPCWhiteStr": "3298534891174687",
              "picPCWhiteUrl": "http://p1.music.126.net/zJoSEhOZvIquJZJQ75YJGA==/3298534891174687.jpg",
              "picPCBlackStr": "3298534891174687",
              "picPCBlackUrl": "http://p1.music.126.net/zJoSEhOZvIquJZJQ75YJGA==/3298534891174687.jpg",
              "picWebStr": "3242459791054879",
              "picWebUrl": "http://p1.music.126.net/fxNHDWCNVvRFa_3KAsBw6w==/3242459791054879.jpg",
              "picMacId": "3295236356291304",
              "picMacUrl": "http://p1.music.126.net/S-TFDK9oynyz0a5xBrH4jQ==/3295236356291304.jpg",
              "picUWPId": "1407374894639481",
              "name": "人文历史",
              "id": 11
            }
          ],
          "more":[
            {
              "picPCBlack": 1364493965906899,
              "picWeb": 3223768093383534,
              "picPCWhite": 1364493965906899,
              "pic96x96Id": 2549767464830052,
              "pic56x56Id": 18652115255401464,
              "pic84x84Id": 18652115255401464,
              "picIPad": 3417282152853925,
              "picUWPUrl": "http://p1.music.126.net/i19tkodhemDN0GKuuh0OuA==/3442570909068509.jpg",
              "picIPadStr": "3417282152853925",
              "picIPadUrl": "http://p1.music.126.net/umfgI9U8RmhXurzkeiyDQQ==/3417282152853925.jpg",
              "pic56x56IdStr": "18652115255401465",
              "pic56x56Url": "http://p1.music.126.net/gFqt5HEhhAsImP_8TMwX8Q==/18652115255401465.jpg",
              "pic96x96IdStr": "2549767464830052",
              "pic96x96Url": "http://p1.music.126.net/8syu4uen9cbezsfzvXDcEg==/2549767464830052.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/gFqt5HEhhAsImP_8TMwX8Q==/18652115255401465.jpg",
              "picPCWhiteStr": "1364493965906899",
              "picPCWhiteUrl": "http://p1.music.126.net/jYABVS8ockX9WcxXsyk_lw==/1364493965906899.jpg",
              "picPCBlackStr": "1364493965906899",
              "picPCBlackUrl": "http://p1.music.126.net/jYABVS8ockX9WcxXsyk_lw==/1364493965906899.jpg",
              "picWebStr": "3223768093383534",
              "picWebUrl": "http://p1.music.126.net/KqO1lPErLxSlBTEHQm7R0w==/3223768093383534.jpg",
              "picMacId": "1364493965906388",
              "picMacUrl": "http://p1.music.126.net/mlqEk-SkuVzyvmm6iBHTCw==/1364493965906388.jpg",
              "picUWPId": "3442570909068509",
              "name": "美文读物",
              "id": 6
            },
            {
              "picPCBlack": 3386495816188411,
              "picWeb": 3240260767799324,
              "picPCWhite": 3386495816188411,
              "pic96x96Id": 2582752813662841,
              "pic56x56Id": 18745573743758776,
              "pic84x84Id": 18745573743758776,
              "picIPad": 3432675312738096,
              "picUWPUrl": "http://p1.music.126.net/jD2Y0pPw0cAP6rhnRYNi7A==/3445869443952135.jpg",
              "picIPadStr": "3432675312738096",
              "picIPadUrl": "http://p1.music.126.net/Vl-ISUesiFSn82LEAPSYJQ==/3432675312738096.jpg",
              "pic56x56IdStr": "18745573743758778",
              "pic56x56Url": "http://p1.music.126.net/VGZ-Yf6WWgCdUuZKGQ4uPw==/18745573743758778.jpg",
              "pic96x96IdStr": "2582752813662841",
              "pic96x96Url": "http://p1.music.126.net/8UInUtc2ZzQ5mA_mk7HNvg==/2582752813662841.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/VGZ-Yf6WWgCdUuZKGQ4uPw==/18745573743758778.jpg",
              "picPCWhiteStr": "3386495816188411",
              "picPCWhiteUrl": "http://p1.music.126.net/AuPV-DJhxVbo7DbkkDKpTA==/3386495816188411.jpg",
              "picPCBlackStr": "3386495816188411",
              "picPCBlackUrl": "http://p1.music.126.net/AuPV-DJhxVbo7DbkkDKpTA==/3386495816188411.jpg",
              "picWebStr": "3240260767799324",
              "picWebUrl": "http://p1.music.126.net/a0nR3qh9fLxx7BV_Vt3Plg==/3240260767799324.jpg",
              "picMacId": "6632254140375164",
              "picMacUrl": "http://p1.music.126.net/pRs8v85lpndA33uhf7a1bA==/6632254140375164.jpg",
              "picUWPId": "3445869443952135",
              "name": "外语世界",
              "id": 13
            },
            {
              "picPCBlack": 3411784583624983,
              "picWeb": 3249056860670081,
              "picPCWhite": 3411784583624983,
              "pic96x96Id": 6636652185840041,
              "pic56x56Id": 18745573743758776,
              "pic84x84Id": 18745573743758776,
              "picIPad": 3417282152853924,
              "picUWPUrl": "http://p1.music.126.net/jOBjBau22ohPPdN70VYcww==/1419469517485950.jpg",
              "picIPadStr": "3417282152853924",
              "picIPadUrl": "http://p1.music.126.net/619IGwWoSqCZsNPbQLi2hQ==/3417282152853924.jpg",
              "pic56x56IdStr": "18745573743758775",
              "pic56x56Url": "http://p1.music.126.net/M_eEy2SjExq7-5ASv3FfIw==/18745573743758775.jpg",
              "pic96x96IdStr": "6636652185840041",
              "pic96x96Url": "http://p1.music.126.net/3ZjxEpM2xgwqb9T2cmdL_Q==/6636652185840041.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/M_eEy2SjExq7-5ASv3FfIw==/18745573743758775.jpg",
              "picPCWhiteStr": "3411784583624983",
              "picPCWhiteUrl": "http://p1.music.126.net/l_i3AjLI0-zCtZ_zgUKuww==/3411784583624983.jpg",
              "picPCBlackStr": "3411784583624983",
              "picPCBlackUrl": "http://p1.music.126.net/l_i3AjLI0-zCtZ_zgUKuww==/3411784583624983.jpg",
              "picWebStr": "3249056860670081",
              "picWebUrl": "http://p1.music.126.net/Jnx0K_M3Nc0Uk5YBXPifqw==/3249056860670081.jpg",
              "picMacId": "3275445146873060",
              "picMacUrl": "http://p1.music.126.net/QEDqWDFgKtLWvM0WSMRc9Q==/3275445146873060.jpg",
              "picUWPId": "1419469517485950",
              "name": "明星做主播",
              "id": 1
            },
            {
              "picPCBlack": 1364493985405387,
              "picWeb": 3389794351757648,
              "picPCWhite": 1364493985405387,
              "pic96x96Id": 1379887094138436,
              "pic56x56Id": 18734578627472520,
              "pic84x84Id": 18734578627472520,
              "picIPad": 3402988502531526,
              "picUWPUrl": "http://p1.music.126.net/Jx3cJ3EQe2k0HGsP0gpLhg==/1420569034620543.jpg",
              "picIPadStr": "3402988502531526",
              "picIPadUrl": "http://p1.music.126.net/CygRxT-NBOfnYP3V4F17ww==/3402988502531526.jpg",
              "pic56x56IdStr": "18734578627472519",
              "pic56x56Url": "http://p1.music.126.net/uAYWhAiyE6O50JYAXOEeqg==/18734578627472519.jpg",
              "pic96x96IdStr": "1379887094138436",
              "pic96x96Url": "http://p1.music.126.net/Gg5zLIvvJu4FOL19apWnpA==/1379887094138436.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/uAYWhAiyE6O50JYAXOEeqg==/18734578627472519.jpg",
              "picPCWhiteStr": "1364493985405387",
              "picPCWhiteUrl": "http://p1.music.126.net/gu-88pW79Rptye4BQJXFTg==/1364493985405387.jpg",
              "picPCBlackStr": "1364493985405387",
              "picPCBlackUrl": "http://p1.music.126.net/gu-88pW79Rptye4BQJXFTg==/1364493985405387.jpg",
              "picWebStr": "3389794351757648",
              "picWebUrl": "http://p1.music.126.net/BVIacbDdjw90QjU4z7mZIw==/3389794351757648.jpg",
              "picMacId": "3307330979668890",
              "picMacUrl": "http://p1.music.126.net/wU0wyLx2S_8Z_mEGFNX4jQ==/3307330979668890.jpg",
              "picUWPId": "1420569034620543",
              "name": "3D|电子",
              "id": 10002
            },
            {
              "picPCBlack": 3253454913168716,
              "picWeb": 3222668581755759,
              "picPCWhite": 3253454913168716,
              "pic96x96Id": 2557464046224033,
              "pic56x56Id": 18652115255401468,
              "pic84x84Id": 18652115255401468,
              "picIPad": 3417282152853929,
              "picUWPUrl": "http://p1.music.126.net/CAxL1lOT9ojiQeKMQMbgAg==/2946691170769531.jpg",
              "picIPadStr": "3417282152853929",
              "picIPadUrl": "http://p1.music.126.net/0MbO9_j1Tqu0rDX3M7MwQQ==/3417282152853929.jpg",
              "pic56x56IdStr": "18652115255401469",
              "pic56x56Url": "http://p1.music.126.net/lI_U_w8tl_l33p1flfyIyQ==/18652115255401469.jpg",
              "pic96x96IdStr": "2557464046224033",
              "pic96x96Url": "http://p1.music.126.net/P85R8VXBIMYgPe0FHF8bBQ==/2557464046224033.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/lI_U_w8tl_l33p1flfyIyQ==/18652115255401469.jpg",
              "picPCWhiteStr": "3253454913168716",
              "picPCWhiteUrl": "http://p1.music.126.net/ZFKDNmPoN9j48gs2Q7YahQ==/3253454913168716.jpg",
              "picPCBlackStr": "3253454913168716",
              "picPCBlackUrl": "http://p1.music.126.net/ZFKDNmPoN9j48gs2Q7YahQ==/3253454913168716.jpg",
              "picWebStr": "3222668581755759",
              "picWebUrl": "http://p1.music.126.net/rIMRtFJCXoPNzOerhHgI9g==/3222668581755759.jpg",
              "picMacId": "3287539771274645",
              "picMacUrl": "http://p1.music.126.net/kOIRPN9cAupN1LMlSRArPA==/3287539771274645.jpg",
              "picUWPId": "2946691170769531",
              "name": "亲子宝贝",
              "id": 14
            },
            {
              "picPCBlack": 2536573329811050,
              "picWeb": 3249056862536456,
              "picPCWhite": 2536573329811050,
              "pic96x96Id": 6644348768003083,
              "pic56x56Id": 18745573743758780,
              "pic84x84Id": 18745573743758780,
              "picIPad": 3394192424321175,
              "picUWPUrl": "http://p1.music.126.net/E19ba8CmXD-KrUA4S4uiWA==/1407374894639482.jpg",
              "picIPadStr": "3394192424321175",
              "picIPadUrl": "http://p1.music.126.net/j-YgAjfuYW0lUak2eTyT0w==/3394192424321175.jpg",
              "pic56x56IdStr": "18745573743758780",
              "pic56x56Url": "http://p1.music.126.net/BQUxxgrtjQc5f7Ci7PMGfQ==/18745573743758780.jpg",
              "pic96x96IdStr": "6644348768003083",
              "pic96x96Url": "http://p1.music.126.net/jeU3kn_IgxDyjcRnRTF_0g==/6644348768003083.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/BQUxxgrtjQc5f7Ci7PMGfQ==/18745573743758780.jpg",
              "picPCWhiteStr": "2536573329811050",
              "picPCWhiteUrl": "http://p1.music.126.net/MuatqiV9wS6yBD-kRhlYGw==/2536573329811050.jpg",
              "picPCBlackStr": "2536573329811050",
              "picPCBlackUrl": "http://p1.music.126.net/MuatqiV9wS6yBD-kRhlYGw==/2536573329811050.jpg",
              "picWebStr": "3249056862536456",
              "picWebUrl": "http://p1.music.126.net/AxVxXIdgRXcpDGlkDehsCw==/3249056862536456.jpg",
              "picMacId": "528865136545953",
              "picMacUrl": "http://p1.music.126.net/n0lo1REeTwHX-wk37KoKoA==/528865136545953.jpg",
              "picUWPId": "1407374894639482",
              "name": "校园|教育",
              "id": 4001
            },
            {
              "picPCBlack": 2536573329811039,
              "picWeb": 7731765766567381,
              "picPCWhite": 2536573329811039,
              "pic96x96Id": 7731765766567379,
              "pic56x56Id": 18652115255401468,
              "pic84x84Id": 18652115255401468,
              "picIPad": 3433774824436959,
              "picUWPUrl": "http://p1.music.126.net/3m0Ztbs1NGxxhc5-zfy7PQ==/3420580683529788.jpg",
              "picIPadStr": "3433774824436959",
              "picIPadUrl": "http://p1.music.126.net/T6YYYd0mleQP400dZ-yhJw==/3433774824436959.jpg",
              "pic56x56IdStr": "18652115255401467",
              "pic56x56Url": "http://p1.music.126.net/DnstbOR7PtpmHsJoA9sDVg==/18652115255401467.jpg",
              "pic96x96IdStr": "7731765766567379",
              "pic96x96Url": "http://p1.music.126.net/s39tl4cYwSCSvOJsu9cpLQ==/7731765766567379.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/DnstbOR7PtpmHsJoA9sDVg==/18652115255401467.jpg",
              "picPCWhiteStr": "2536573329811039",
              "picPCWhiteUrl": "http://p1.music.126.net/GNERsDGLKpOEmKrPoh491A==/2536573329811039.jpg",
              "picPCBlackStr": "2536573329811039",
              "picPCBlackUrl": "http://p1.music.126.net/GNERsDGLKpOEmKrPoh491A==/2536573329811039.jpg",
              "picWebStr": "7731765766567381",
              "picWebUrl": "http://p1.music.126.net/2jEyq6KuPUv0GgFOeDB0rA==/7731765766567381.jpg",
              "picMacId": "3287539771274475",
              "picMacUrl": "http://p1.music.126.net/YZ47uYfSjac4C208Bdmicg==/3287539771274475.jpg",
              "picUWPId": "3420580683529788",
              "name": "二次元",
              "id": 3001
            },
            {
              "picPCBlack": 3264450032376602,
              "picWeb": 3223768093383535,
              "picPCWhite": 3264450032376602,
              "pic96x96Id": 2549767464830058,
              "pic56x56Id": 18813743464683690,
              "pic84x84Id": 18813743464683690,
              "picIPad": 18515775812052400,
              "picUWPUrl": "http://p1.music.126.net/EWKCffS7oWZBVkYQV6Ueww==/3426078237139270.jpg",
              "picIPadStr": "18515775812052401",
              "picIPadUrl": "http://p1.music.126.net/tYWdfqV3Wb2RxraDG_gz7A==/18515775812052401.jpg",
              "pic56x56IdStr": "18813743464683690",
              "pic56x56Url": "http://p1.music.126.net/4HQ4SfM_caN0RuOSFB02JA==/18813743464683690.jpg",
              "pic96x96IdStr": "2549767464830058",
              "pic96x96Url": "http://p1.music.126.net/BebAAke7MTFkEdxVw8r01w==/2549767464830058.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/4HQ4SfM_caN0RuOSFB02JA==/18813743464683690.jpg",
              "picPCWhiteStr": "3264450032376602",
              "picPCWhiteUrl": "http://p1.music.126.net/ZtduRfUvCYINd1r9dzqEgQ==/3264450032376602.jpg",
              "picPCBlackStr": "3264450032376602",
              "picPCBlackUrl": "http://p1.music.126.net/ZtduRfUvCYINd1r9dzqEgQ==/3264450032376602.jpg",
              "picWebStr": "3223768093383535",
              "picWebUrl": "http://p1.music.126.net/Y0RoVx8oMTDyukbiqbizAA==/3223768093383535.jpg",
              "picMacId": "3287539771274482",
              "picMacUrl": "http://p1.music.126.net/TTKWxfQgpuRw3Z48i9lbeg==/3287539771274482.jpg",
              "picUWPId": "3426078237139270",
              "name": "旅途|城市",
              "id": 12
            },
            {
              "picPCBlack": 3276544658509432,
              "picWeb": 3242459791054877,
              "picPCWhite": 3276544658509432,
              "pic96x96Id": 6663040464912318,
              "pic56x56Id": 18716986441432256,
              "pic84x84Id": 18716986441432256,
              "picIPad": 2946691221625292,
              "picUWPUrl": "http://p1.music.126.net/zOCh-hHcmpduRq8nojaFRQ==/3393092887967887.jpg",
              "picIPadStr": "2946691221625292",
              "picIPadUrl": "http://p1.music.126.net/JzHvKWSxm8hGUnJAPXWl1A==/2946691221625292.jpg",
              "pic56x56IdStr": "18716986441432255",
              "pic56x56Url": "http://p1.music.126.net/R1VSFdXNQJPitBVenq8otQ==/18716986441432255.jpg",
              "pic96x96IdStr": "6663040464912318",
              "pic96x96Url": "http://p1.music.126.net/7YMBomndKvWknLA47OO59A==/6663040464912318.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/R1VSFdXNQJPitBVenq8otQ==/18716986441432255.jpg",
              "picPCWhiteStr": "3276544658509432",
              "picPCWhiteUrl": "http://p1.music.126.net/omo1b-BLqyJy7pRt7oVuRA==/3276544658509432.jpg",
              "picPCBlackStr": "3276544658509432",
              "picPCBlackUrl": "http://p1.music.126.net/omo1b-BLqyJy7pRt7oVuRA==/3276544658509432.jpg",
              "picWebStr": "3242459791054877",
              "picWebUrl": "http://p1.music.126.net/8yoy33lYuvviDbcg1AOLUw==/3242459791054877.jpg",
              "picMacId": "2882919492026644",
              "picMacUrl": "http://p1.music.126.net/kTe8gPytAVZoqJXbf2d1Lg==/2882919492026644.jpg",
              "picUWPId": "3393092887967887",
              "name": "娱乐|影视",
              "id": 4
            },
            {
              "picPCBlack": 3285340748019232,
              "picWeb": 3222668581755757,
              "picPCWhite": 3285340748019232,
              "pic96x96Id": 6636652185840045,
              "pic56x56Id": 18813743464683692,
              "pic84x84Id": 18813743464683692,
              "picIPad": 18598239184123310,
              "picUWPUrl": "http://p1.music.126.net/oki32rbBxyvz5w-KfJSJDA==/3445869443952136.jpg",
              "picIPadStr": "18598239184123312",
              "picIPadUrl": "http://p1.music.126.net/xeXTLsQK70axVivcc14jjw==/18598239184123312.jpg",
              "pic56x56IdStr": "18813743464683692",
              "pic56x56Url": "http://p1.music.126.net/i41fxj7JQWDq6yl7LEFBLQ==/18813743464683692.jpg",
              "pic96x96IdStr": "6636652185840045",
              "pic96x96Url": "http://p1.music.126.net/YxYIqrAraUGd8ff7u1DagA==/6636652185840045.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/i41fxj7JQWDq6yl7LEFBLQ==/18813743464683692.jpg",
              "picPCWhiteStr": "3285340748019232",
              "picPCWhiteUrl": "http://p1.music.126.net/xlxt9R-wQllhjXtu--sjdw==/3285340748019232.jpg",
              "picPCBlackStr": "3285340748019232",
              "picPCBlackUrl": "http://p1.music.126.net/xlxt9R-wQllhjXtu--sjdw==/3285340748019232.jpg",
              "picWebStr": "3222668581755757",
              "picWebUrl": "http://p1.music.126.net/7w_raI-xEIUaQOn6YocTvw==/3222668581755757.jpg",
              "picMacId": "1364493965906355",
              "picMacUrl": "http://p1.music.126.net/UCONmzT1T4V5DfWDqhO8AA==/1364493965906355.jpg",
              "picUWPId": "3445869443952136",
              "name": "广播剧",
              "id": 7
            },
            {
              "picPCBlack": 2531075771245797,
              "picWeb": 3240260767799323,
              "picPCWhite": 2531075771245797,
              "pic96x96Id": 6663040464912323,
              "pic56x56Id": 18716986441432256,
              "pic84x84Id": 18716986441432256,
              "picIPad": 3442570917356878,
              "picUWPUrl": "http://p1.music.126.net/t66Iite_do7IsqwEnPDvwg==/3420580683529789.jpg",
              "picIPadStr": "3442570917356878",
              "picIPadUrl": "http://p1.music.126.net/3yL63EC54pX6AOr1JW37qw==/3442570917356878.jpg",
              "pic56x56IdStr": "18716986441432257",
              "pic56x56Url": "http://p1.music.126.net/bbD4uzg_e593XK4Y7wQgZg==/18716986441432257.jpg",
              "pic96x96IdStr": "6663040464912323",
              "pic96x96Url": "http://p1.music.126.net/yw5FD1zHI7Jd-SEnN0QdEg==/6663040464912323.jpg",
              "pic84x84IdUrl": "http://p1.music.126.net/bbD4uzg_e593XK4Y7wQgZg==/18716986441432257.jpg",
              "picPCWhiteStr": "2531075771245797",
              "picPCWhiteUrl": "http://p1.music.126.net/4_ggaIR3ZhedI8ROYCXEJQ==/2531075771245797.jpg",
              "picPCBlackStr": "2531075771245797",
              "picPCBlackUrl": "http://p1.music.126.net/4_ggaIR3ZhedI8ROYCXEJQ==/2531075771245797.jpg",
              "picWebStr": "3240260767799323",
              "picWebUrl": "http://p1.music.126.net/DZV3wnLcYoc32YLnxoVCOg==/3240260767799323.jpg",
              "picMacId": "1365593477513889",
              "picMacUrl": "http://p1.music.126.net/yj1xEn-XOhn9ccykTv_rEQ==/1365593477513889.jpg",
              "picUWPId": "3420580683529789",
              "name": "相声曲艺",
              "id": 8
            }
          ]
        }
      }
    },
    computed:{
        DJList(){
            return this.$store.getters.getDjList;
        }
    },
    methods: {
        getHotData(){
          if (this.DJList.length > 0) {
            console.log(this.DJList)
            this.Loading = false;
            return;
          }
          let list = [];
          let L = DjTypeJson.hot;

          let P = (id) => {
            return new Promise((resolve, reject) => {
              axios.get('/nodeApi/dj/recommend/type?type='+ id ).then(res => {
                resolve(res);
              });
            })
          };
          new Promise((resolve, reject) => {
            Promise.all(L.map(item => {

              P(item.id).then(res => {
                  if(res.status==200){
                     item.list=res.data.djRadios;
                     list.push(item);
                     resolve(res.data.djRadios)
                  }
              });
            }));
          }).then(result => {
            this.Loading = false;
            this.$store.commit('set_dj_list', list);
            this.HotList = list;
            //consoloe.log(this.HotList)
          });
        }
    },
    mounted(){
        this.getHotData();
    },
    components: {
      Swipe, SwipeItem,cateTitle,DjList
    }
  }
</script>
<style scoped>
  @import "~vue-swipe/dist/vue-swipe.css";
  .index-nav-component{width: 100%;}
  .my-swipe {
    width: 100%;
    height: 3rem;
  }
  .slide {
    width: 100%;
    height: 100%;
  }
  .slide-img {
    width: 100%;
    height: 100%;
  }
  .center-link{border-bottom: 1px solid #e6e6e6;padding: 5px 0; display: flex;justify-content: space-between;margin-bottom: .4rem;}
  .center-link >div{float: left;display: flex;width: 49.3%;  justify-content: center; align-items: center;}
  .center-link >div:nth-child(2n+1)
  {border-right: 1px solid #e6e6e6;}
  .line{
    display: block;
    width: 1px;
    content: "丨";
    color:#e6e6e6;
  }
  .center-link i,.center-link span{float: left;}
  .center-link span{line-height: 30px;display: inline-block;font-size: 14px;}
  .icon {display: inline-block; width: 28px;height: 28px;background-size: contain!important;}
  .dj-type{background: url(../../../static/images/find_music/icon_type.png) center no-repeat;}
  .dj-rank{background: url(../../../static/images/find_music/icon_rank.png) center no-repeat;}
  .dj-list{width: 100%; margin-bottom: .35rem;}
  .dj-type-list li{width: 33%;float: left;margin-right: .5%;margin-bottom: .3rem}
  .dj-type-list li:nth-child(3n){margin-right: 0;}
  .dj-type-list li img{max-width: 100%;}
  .dj-type-list li p{padding: 0 5px;}
  .dj-type-item img{width: 28px; height: 28px;position: absolute; left: .5rem;top:.1rem;}
  .dj-link{margin-bottom: .3rem;}
  .dj-type-item{position: relative; padding: 5px 0;}
  .dj-link .dj-type-item{float: left;width: 49.4%; display: flex; justify-content: center; align-items: center;
    line-height: 32px;height: 32px;border-bottom: 1px solid #e6e6e6;}
  .dj-link .dj-type-item:first-child,.dj-link .dj-type-item:nth-child(2){border-top: 1px solid #e6e6e6;}
  .dj-link .dj-type-item:nth-child(2n+1){border-right: 1px solid #e6e6e6;}
</style>
