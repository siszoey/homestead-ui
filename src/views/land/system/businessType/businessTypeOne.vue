<template>
    <div>
        <el-tabs v-model="activeName" :tab-position="tabPosition">
            <el-tab-pane label="基本信息" name="jbxx">
                <div class="jbxx" id="jbxx">
                    <div class="jbxx_titles">
                        <div class="jbxx_tit">
                            <span class="jbxx_bt">基本信息</span>

                            <span class="tips">承诺件</span>



                            <span class="tips">不收费</span>

                        </div>
                    </div>
                    <div class="hx_fg"></div>
                    <div class="jbxx_tables">
                        <table id="table1">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="type_title">
                                        <div>事项信息</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>事项名称</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            {{businessType}}
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>事项类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            行政确认
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>基本编码</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            330707046004
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>实施编码</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            11330700002592054F3330707046004
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="things_title">
                                        <div>受理机构</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            铺前镇乡镇政府
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>决定机构</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            铺前镇乡镇政府
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>服务对象</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            个人/(允许个人代办)
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>办件类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            承诺件
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>法定办结时限</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            <span class="lf">
                                                30（工作日）

                                            </span>

                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>承诺办结时限</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            <span class="lf">
                                                4（工作日）

                                            </span>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>中介服务</div>
                                    </td>
                                    <td class="things_con">
                                        <div id="zjfw">
                                            <span>不涉及中介服务</span></div>
                                    </td>
                                    <td class="things_title">
                                        <div>特别程序</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>到办事现场次数</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            0次


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>网上办理深度</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            全程网办（Ⅳ级）


                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <table id="table2" style="display: table;">
                            <tbody>
                                <tr>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>必须现场办理原因说明</div>
                                    </td>
                                    <td class="things_con" colspan="3">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>权力属性</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            本级保留


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>权力来源</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            法定本级行使


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>行使层级</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            市级


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>联办机构</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>适用对象说明</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            个人、允许个人代办


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>事项审查类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            前审后批


                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="things_title">
                                        <div>涉及的内容</div>
                                    </td>
                                    <td class="things_con" colspan="3">
                                        <div>
                                            {{businessType}}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="things_title">
                                        <div>实施主体性质</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            法定机关


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>实施或牵头处（科）室名称</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不动产登记中心


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>实施主体编码</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>委托部门</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无委托部门

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>行政相对人权利和义务</div>
                                    </td>
                                    <td class="things_con" colspan="3">
                                        <div>

                                            （一）符合法定条件、标准的，申请人有依法取得行政许可的平等权利，行政机关不得歧视。
                                            （二）行政机关依法作出不予行政许可的书面决定的，应当说明理由，并告知申请人享有依法申请行政复议或者提起行政诉讼的权利。
                                            （三）行政许可直接涉及申请人与他人之间重大利益关系的，行政机关在作出行政许可决定前，应当告知申请人、利害关系人享有要求听证的权利；申请人、利害关系人在被告知听证权利之日起五日内提出听证申请的，行政机关应当在二十日内组织听证。
                                            （四）申请人申请行政许可，应当如实向行政机关提交有关材料和反映真实情况，并对其申请材料实质内容的真实性负责。


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否进驻政务大厅</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            是


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>是否支持自助终端办理</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不支持


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>自然人主题分类</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            规划建设/住房保障


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>法人主题分类</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            国土和规划建设


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="type_title">
                                        <div>办事信息</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否网办</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            是


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>是否支持预约办理</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不支持


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>办理形式</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            网上申请/现场窗口申请/邮寄申请


                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>通办范围</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            全市
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="type_title">
                                        <div>结果信息</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>审批结果类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            无
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>审批结果名称</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            不动产证书
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>审批结果样本</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            <a href="http://zjqlk.oss-cn-hangzhou.aliyuncs.com/a/7/75761e33-643d-4f71-86fa-f7948b93028a.jpg"
                                                style="color: #33a0e5" target="_blank">样本下载</a>
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>是否支持物流快递</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            支持


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>送达时限</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            自作出决定之日起1个工作日内送达。
                                        </div>
                                    </td>
                                    <td class="things_title">
                                        <div>送达方式</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            当场送达/快递送达
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table id="table3">
                            <tbody>
                                <tr>
                                    <td colspan="2" class="type_title">
                                        <div>事项信息</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>事项名称</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            {{businessType}}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>事项类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            行政确认
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>基本编码</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            330707046004
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>实施编码</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            11330700002592054F3330707046004
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>受理机构</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            铺前镇乡镇政府
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>决定机构</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            铺前镇乡镇政府
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="things_title">
                                        <div>服务对象</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            个人,(允许个人代办)


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>办件类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            承诺件


                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table id="table4">
                            <tbody>
                                <tr>
                                    <td class="things_title">
                                        <div>法定办结时限</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            <span class="lf">
                                                30（工作日）

                                            </span>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>承诺办结时限</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            <span class="lf">
                                                4（工作日）

                                            </span>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>中介服务</div>
                                    </td>
                                    <td class="things_con">
                                        <div id="zjfw"></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>到办事现场次数</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            0次


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>网上办理深度</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            全程网办（Ⅳ级）


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>必须现场办理原因说明</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>权力属性</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            本级保留


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>权力来源</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            法定本级行使


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>行使层级</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            市级


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>联办机构</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>适用对象说明</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            个人、允许个人代办


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>事项审查类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            前审后批


                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="things_title">
                                        <div>涉及的内容</div>
                                    </td>
                                    <td class="things_con">
                                        <div>
                                            {{businessType}}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="things_title">
                                        <div>实施主体性质</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            法定机关


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>实施或牵头处（科）室名称</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不动产登记中心


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>实施主体编码</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>委托部门</div>
                                    </td>
                                    <td class="things_con">
                                        <div>


                                            无委托部门

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>行政相对人权利和义务</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            （一）符合法定条件、标准的，申请人有依法取得行政许可的平等权利，行政机关不得歧视。
                                            （二）行政机关依法作出不予行政许可的书面决定的，应当说明理由，并告知申请人享有依法申请行政复议或者提起行政诉讼的权利。
                                            （三）行政许可直接涉及申请人与他人之间重大利益关系的，行政机关在作出行政许可决定前，应当告知申请人、利害关系人享有要求听证的权利；申请人、利害关系人在被告知听证权利之日起五日内提出听证申请的，行政机关应当在二十日内组织听证。
                                            （四）申请人申请行政许可，应当如实向行政机关提交有关材料和反映真实情况，并对其申请材料实质内容的真实性负责。


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否进驻政务大厅</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            是


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否支持自助终端办理</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不支持


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>自然人主题分类</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            规划建设/住房保障


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>法人主题分类</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            国土和规划建设


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="type_title">
                                        <div>办事信息</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否网办</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            是


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否支持预约办理</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不支持


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>办理形式</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            网上申请/现场窗口申请/邮寄申请


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>通办范围</div>
                                    </td>
                                    <td class="things_con">
                                        <div>




                                            全市




                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="2" class="type_title">
                                        <div>结果信息</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>审批结果类型</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            无


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>审批结果名称</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            不动产证书


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>审批结果样本</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            <a href="http://zjqlk.oss-cn-hangzhou.aliyuncs.com/a/7/75761e33-643d-4f71-86fa-f7948b93028a.jpg"
                                                style="color: #33a0e5">样本下载</a>


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>是否支持物流快递</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            支持


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>送达时限</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            自作出决定之日起1个工作日内送达。


                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="things_title">
                                        <div>送达方式</div>
                                    </td>
                                    <td class="things_con">
                                        <div>

                                            当场送达/快递送达


                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="线下办事点" name="xxbsd">
                <div class="underLine_place" id="underLine_place">
                    <div class="underLine_place_title clearfix">
                        <h3>线下办事地点/时间</h3>

                    </div>
                    <div class="hx_fg"></div>
                    <div class="underLine_place_con" id="addressListHtml">
                        <div class="underLine_place_item clearfix">
                            <div class="address_time lf">
                                <p class="clearfix"><span class="subTit">具体地址：</span><span class="Cons">
                                        铺前镇乡镇政府
                                    </span></p>
                                <p class="clearfix"><span class="subTit">办理时间：</span><span class="Cons">
                                        周一至周五上午9点30分到晚上6点
                                    </span></p>
                                <!-- <p class="clearfix"><span class="subTit">联系电话：</span><span class="Cons">
                                        400-831-5151
                                    </span></p> -->
                            </div>
                            <div class="map rf"><a target="_blank" class="map_item"
                                    href="https://map.baidu.com/search/%E4%B8%8A%E6%B5%B7%E9%A3%9E%E6%9C%AA%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8/@13515629.825,3632599.79,19z?querytype=s&da_src=shareurl&wd=%E4%B8%8A%E6%B5%B7%E9%A3%9E%E6%9C%AA%E4%BF%A1%E6%81%AF%E6%8A%80%E6%9C%AF%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8&c=289&src=0&wd2=%E4%B8%8A%E6%B5%B7%E5%B8%82%E5%BE%90%E6%B1%87%E5%8C%BA&pn=0&sug=1&l=13&b=(13494601,3623593;13542697,3647657)&from=webmap&biz_forward=%7B%22scaler%22:2,%22styles%22:%22pl%22%7D&sug_forward=3626ed4e8fbd456ce315f949&device_ratio=2">
                                    <span>地图</span><img
                                        src="//zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/script/zjservice/resources/bscx/sxcx/workGuide/imagesNew/y.png"></a>
                            </div>
                        </div>



                    </div>
                    <div class="bsddgd" style="display: none;">
                        <span>显示更多<img
                                src="//zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/script/zjservice/resources/bscx/sxcx/workGuide/imagesNew/xl.png"></span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="申请条件" name="sqtj">
                <div class="sqtj" id="sqtj">
                    <div class="sqtj_title">
                        <h3>申请条件</h3>
                    </div>
                    <div class="hx_fg"></div>
                    <div class="sqtj_con">
                        <p class="sub_title slxz"><em>●</em>数量限制</p>
                        <div class="sltj_con">


                            <span style="color:#333333">无数量限制</span>

                        </div>
                        <div class="sltj">
                            <p class="sub_title"><em>●</em>受理条件</p>
                            <div class="sltj_con">

                                <span style="color:#333333">序号材料类别材料名称材料要求备注
                                    <br>1不动产登记申请表不动产登记申请表原、必
                                    <br>2<br>申请人合法有效身份证明权利人身份证复、必
                                    <br>申请人属于房屋所在地农村集体经济组织成员的证明原、必<br>
                                    <br>3委托代理人有效身份证明授权委托书原、选
                                    <br>受托人身份证复、选
                                    <br><br>4土地权属来源证明农村私人建房用地呈报表原、选
                                    <br>土地房屋所有权证（土地改革前建）原、选
                                    <br>土地及房屋权属来源和权属演变的证明（1982年2月13日前建）原、选
                                    <br><br>宅基地证（土地改革后至1986年底前建）原、选
                                    <br>其他权属来源证明材料原、选
                                    <br>5<br>房屋符合城乡规划的证明村镇规划用地许可证原、必
                                    <br>建设工程规划许可证原、必
                                    <br><br>建房施工许可证原、选
                                    <br>规划验收合格证明原、必
                                    <br>其他符合规划的证明材料原、选<br>
                                    <br>6符合一户一宅的证明符合一户一宅的证明或承诺原、选
                                    <br>7房屋地址证明门牌证<br>复、选
                                    <br>8权籍调查成果权籍调查表、宗地图、房屋平面图、宗地界址坐标、房屋测绘报告等原、必<br>
                                    <br>9应当提交的其他证明材料经依法处理的文件及凭证（涉及违法用地或违法建设）原、选
                                    <br><br>合作（联建）协议和产权分割协议（涉及联建）原、选
                                    <br><br>房屋分割协议（涉及分家析产）经依法处理的文件及凭证原、选
                                    <br>房屋继承证明（涉及继承、受遗赠）原、选</span>


                            </div>
                        </div>
                        <p class="sub_title"><em>●</em>禁止性要求</p>
                        <div class="sltj_con">

                            <span style="color:#333333">无禁止性要求</span>


                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="申报材料" name="sbcl">
                <div class="sbcl" id="sbcl">
                    <div class="sbcl_title">
                        <h3>申报材料</h3>
                    </div>
                    <div class="hx_fg"></div>
                    <table class="sbcl_table" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <td colspan="2">材料名称</td>
                                <td>来源渠道</td>
                                <td>材料形式</td>
                                <td>纸质材料份数</td>
                                <td>材料必要性</td>
                                <td>材料下载</td>
                                <td>材料类型</td>
                                <td>纸质材料规格</td>
                                <td>受理标准</td>
                                <td>填报须知</td>
                                <td>要求提供材料的依据</td>
                                <td>备注</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="bg_gary">1</td>
                                <td width="167px">申请人或受托人身份证明</td>
                                <td>申请人自备</td>
                                <td>纸质或电子</td>
                                <td>1份</td>
                                <td>必要</td>
                                <td>无</td>
                                <td>无</td>
                                <td>A4</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                            </tr>
                            <tr>
                                <td class="bg_gary">2</td>
                                <td width="167px">土地权属来源材料（包括竣工规划核实和用地核实复核材料、房屋符合规划或建设的材料）</td>
                                <td>申请人自备</td>
                                <td>纸质或电子</td>
                                <td>1份</td>
                                <td>必要</td>
                                <td>无</td>
                                <td>无</td>
                                <td>A4</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                            </tr>
                            <tr>
                                <td class="bg_gary">3</td>
                                <td width="167px">原不动产权证书</td>
                                <td>申请人自备</td>
                                <td>纸质或电子</td>
                                <td>1份</td>
                                <td>必要</td>
                                <td>无</td>
                                <td>无</td>
                                <td>A4</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                                <td>无</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="办事流程" name="bllc">
                <div class="bllc" id="bllc">
                    <div class="bllc_title">
                        <span class="bllcTit">办理流程</span>

                        <span class="tips">0次跑动</span>

                    </div>
                    <div class="hx_fg"></div>
                    <div class="bllc_con">

                        <span style="color:#333333">
                            <p>申请-受理-办结</p>
                            <table width="605">
                                <tbody>
                                    <tr class="firstRow">
                                        <td style="padding: 0px; border: 1px outset windowtext; background-color: transparent; border-image: none;"
                                            width="63">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><a><span
                                                            style="color: rgb(0, 0, 0);">环节</span></a></span></p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="77">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">办理时限</span></span></p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            valign="top" width="105">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">办理人员</span></span></p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="173">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">审批标准</span></span></p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="187">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">办理结果</span></span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border-width: 0px 1px 1px; border-style: none outset outset; border-color: rgb(0, 0, 0) windowtext windowtext; padding: 0px; background-color: transparent;"
                                            width="63">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">申请</span></span></p>
                                        </td>
                                        <td colspan="4"
                                            style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="542">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">通过浙江省政务服务网进行网上提交申请，按要求上传相关附件，窗口提交申请材料原件</span></span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border-width: 0px 1px 1px; border-style: none outset outset; border-color: rgb(0, 0, 0) windowtext windowtext; padding: 0px; background-color: transparent;"
                                            width="63">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">受理</span></span></p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="77">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">即办</span></span></p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            valign="top" width="105">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">窗口人员</span></span></p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="173">
                                            <p><span style="color: rgb(0, 0, 0);"><span
                                                        style="font-family: 宋体; font-size: 14px;">1、</span><span
                                                        style="font-family: 宋体; font-size: 14px;">对申请材料进行初步审核。经审核，申请材料齐全、符合法定形式的，决定予以受理。</span></span>
                                            </p>
                                            <p><span
                                                    style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 14px;">2、</span><span
                                                    style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 14px;">申请材料不齐全或者不符合法定形式的，应当当场告知申请人需要补正的全部内容。</span>
                                            </p>
                                        </td>
                                        <td style="border-width: 1px 1px 1px 0px; border-style: outset outset outset none; border-color: windowtext windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="187">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">1<span
                                                            style="font-family: 宋体;">、不符合条件的，告知原因并退回材料；</span><span
                                                            style="font-family: Calibri;">2</span><span
                                                            style="font-family: 宋体;">、材料不齐全或者不符合法定形式，一次性告知补正的全部材料；</span><span
                                                            style="font-family: Calibri;">3</span><span
                                                            style="font-family: 宋体;">、申请材料齐全并且符合法定形式，予以受理。</span></span></span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border-width: 0px 1px 1px; border-style: none outset outset; border-color: rgb(0, 0, 0) windowtext windowtext; padding: 0px; background-color: transparent;"
                                            width="63">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">办理</span></span></p>
                                        </td>
                                        <td rowspan="2"
                                            style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="77">
                                            <p><span style="color: rgb(0, 0, 0);"><span
                                                        style="font-family: 宋体; font-size: 14px;">4</span><span
                                                        style="font-family: 宋体; font-size: 14px;">个工作日<span
                                                            style="font-family: Calibri;">&nbsp;</span></span></span>
                                            </p>
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">&nbsp;</span></span></p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            valign="top" width="105">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">审批处人员</span></span></p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="173">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">提交材料是否齐全、是否符合法定形式；材料需要核实的，核实相关材料。</span></span>
                                            </p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="187">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">1<span
                                                            style="font-family: 宋体;">、申请人的申请符合法定条件、标准的，作出同意登记决定；
                                                        </span><span style="font-family: Calibri;">&nbsp;2</span><span
                                                            style="font-family: 宋体;">、申请不符合法定条件、标准的，作出不同意登记的决定。</span><span
                                                            style="font-family: Calibri;">&nbsp;</span></span></span>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="border-width: 0px 1px 1px; border-style: none outset outset; border-color: rgb(0, 0, 0) windowtext windowtext; padding: 0px; background-color: transparent;"
                                            width="63">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">决定（登记）</span></span></p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            valign="top" width="105">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">局领导、审批处室人员</span></span></p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="173">
                                            <p><span
                                                    style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 14px;">根据审核情况，作出准予登记或不予</span><span
                                                    style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 14px;">登记</span><span
                                                    style="color: rgb(51, 51, 51); font-family: 宋体; font-size: 14px;">的决定</span>
                                            </p>
                                        </td>
                                        <td style="border-width: 0px 1px 1px 0px; border-style: none outset outset none; border-color: rgb(0, 0, 0) windowtext windowtext rgb(0, 0, 0); padding: 0px; background-color: transparent;"
                                            width="187">
                                            <p><span style="font-family: 宋体; font-size: 14px;"><span
                                                        style="color: rgb(0, 0, 0);">1<span
                                                            style="font-family: 宋体;">、同意登记的，打印不动产权证；</span><span
                                                            style="font-family: Calibri;">2</span><span
                                                            style="font-family: 宋体;">、不同意登记的，制作不予登记告知书。</span></span></span>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>


                    </div>

                    <a href="javascript:void(0);" onclick="window.open(encodeURI('image/examine/zjdlct.png'));"
                        class="lc_btn">查看流程图</a>


                </div>
            </el-tab-pane>
            <el-tab-pane label="收费标准" name="sfbz">
                <div class="sfbz" id="sfbz">
                    <div class="sfbz_title">
                        <h3>收费标准</h3>
                    </div>
                    <div class="hx_fg"></div>
                    <div class="sfsf">
                        <p class="sub_title sfyj"><em>●</em>是否收费</p>
                        <div class="sfyjCon">


                            <span style="color:#333333;">不收费</span>

                        </div>
                    </div>
                    <div class="sfyj">
                        <p class="sub_title sfyj"><em>●</em>收费依据</p>
                        <div class="sfyjCon">


                            <span style="color:#333333;">无</span>

                        </div>
                    </div>
                    <div class="sfzccwszf">
                        <p class="sub_title sfyj"><em>●</em>是否支持网上支付</p>
                        <div class="sfyjCon">

                            <span style="color:#333333">不支持</span>


                        </div>
                    </div>

                </div>
            </el-tab-pane>
            <el-tab-pane label="常见问题" name="cjwt">
                <div class="cjwt" id="cjwt">
                    <div class="cjwt_title">
                        <h3>常见问题</h3>
                    </div>
                    <div class="hx_fg"></div>
                    <div class="cjwt_table">
                        <span style="color:#333333;font-size:13px">暂无常见问题解答，如果您有疑问，请与我们进行联系。</span>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="设定依据" name="sdyj">
                <div class="sdyj" id="sdyj">
                    <div class="sdyj_title">
                        <h3>设定依据</h3>
                    </div>
                    <div class="hx_fg"></div>
                    <div class="sdyj_content">


                        <div class="sdyj_item">
                            <p class="sub_title"><em>●</em>国家法律依据</p>
                            <div class="sdyj_con">
                                <span
                                    style="color:#333333;font-size:13px">《不动产登记暂行条例》第五条下列不动产权利，依照本条例的规定办理登记：<br>（一）集体土地所有权；<br>（二）房屋等建筑物、构筑物所有权；<br>（三）森林、林木所有权；<br>（四）耕地、林地、草地等土地承包经营权；<br>（五）建设用地使用权；<br>（六）宅基地使用权；<br>（七）海域使用权；<br>（八）地役权；<br>（九）抵押权；<br>（十）法律规定需要登记的其他不动产权利。<br><br>《不动产登记暂行条例实施细则》第四章第四节宅基地使用权及房屋所有权登记<br>第四十条依法取得宅基地使用权，可以单独申请宅基地使用权登记。<br>依法利用宅基地建造住房及其附属设施的，可以申请宅基地使用权及房屋所有权登记。<br>第四十一条申请宅基地使用权及房屋所有权首次登记的，应当根据不同情况，提交下列材料：<br>（一）申请人身份证和户口簿；<br>（二）不动产权属证书或者有批准权的人民政府批准用地的文件等权属来源材料；<br>（三）房屋符合规划或者建设的相关材料；<br>（四）权籍调查表、宗地图、房屋平面图以及宗地界址点坐标等有关不动产界址、面积等材料；<br>（五）其他必要材料。<br>第四十二条因依法继承、分家析产、集体经济组织内部互换房屋等导致宅基地使用权及房屋所有权发生转移申请登记的，申请人应当根据不同情况，提交下列材料：<br>（一）不动产权属证书或者其他权属来源材料；<br>（二）依法继承的材料；<br>（三）分家析产的协议或者材料：<br>（四）集体经济组织内部互换房屋的协议；<br>（五）其他必要材料。<br>第四十三条申请宅基地等集体土地上的建筑物区分所有权登记的，参照国有建设用地使用权及建筑物区分所有权的规定办理登记。</span>
                            </div>
                        </div>


                        <div class="sdyj_item">
                            <p class="sub_title"><em>●</em>省级法律依据</p>
                            <div class="sdyj_con">
                                <span style="color:#333333;font-size:13px">《不动产登记暂行条例》第五条下列不动产权利，依照本条例的规定办理登记：
                                    <br>（一）集体土地所有权；
                                    <br><br>（二）房屋等建筑物、构筑物所有权；
                                    <br>（三）森林、林木所有权；
                                    <br><br>（四）耕地、林地、草地等土地承包经营权；
                                    <br>（五）建设用地使用权；
                                    <br>（六）宅基地使用权；<br>
                                    <br>（七）海域使用权；
                                    <br>（八）地役权；
                                    <br>（九）抵押权；
                                    <br><br>（十）法律规定需要登记的其他不动产权利。
                                    <br>
                                    <br><br>《不动产登记暂行条例实施细则》第四章第四节宅基地使用权及房屋所有权登记
                                    <br>第四十条<br>依法取得宅基地使用权，可以单独申请宅基地使用权登记。
                                    <br><br>依法利用宅基地建造住房及其附属设施的，可以申请宅基地使用权及房屋所有权登记。
                                    <br>第四十一条<br>申请宅基地使用权及房屋所有权首次登记的，应当根据不同情况，提交下列材料：
                                    <br>（一）申请人身份证和户口簿；<br>
                                    <br>（二）不动产权属证书或者有批准权的人民政府批准用地的文件等权属来源材料；
                                    <br><br>（三）房屋符合规划或者建设的相关材料；
                                    <br><br>（四）权籍调查表、宗地图、房屋平面图以及宗地界址点坐标等有关不动产界址、面积等材料；
                                    <br>（五）其他必要材料。<br>
                                    <br>第四十二条<br>因依法继承、分家析产、集体经济组织内部互换房屋等导致宅基地使用权及房屋所有权发生转移申请登记的，申请人应当根据不同情况，提交下列材料：<br>
                                    <br>（一）不动产权属证书或者其他权属来源材料；
                                    <br>（二）依法继承的材料；
                                    <br><br>（三）分家析产的协议或者材料：
                                    <br>（四）集体经济组织内部互换房屋的协议；
                                    <br><br>（五）其他必要材料。
                                    <br>第四十三条申请宅基地等集体土地上的建筑物区分所有权登记的，参照国有建设用地使用权及建筑物区分所有权的规定办理登记。</span>
                            </div>
                        </div>





                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        props: {
            businessType: String
        },
        data() {
            return {
                tabPosition: 'left',
                activeName: 'jbxx'
            };
        },
        watch: {
            businessType(newValue, oldValue) {
                this.$nextTick(() => {
                    this.activeName='jbxx'
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    /* å¤´å°¾æ‰€éœ€ç»Ÿä¸€æ ·å¼ */
    *,
    *:before,
    *:after {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    html,
    body,
    div,
    dl,
    dt,
    dd,
    ul,
    ol,
    li,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    pre,
    code,
    form,
    fieldset,
    legend,
    input,
    textarea,
    p,
    blockquote,
    th,
    td,
    hr,
    button,
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section,
    img {
        margin: 0px;
        padding: 0px;
        outline: none;
        border: 0px;
    }

    li {
        list-style: none;
    }

    body {
        text-align: left;
        font-family: 'å¾®è½¯é›…é»‘';
        color: #333333;
        background: #fff;
    }

    html {
        font-size: 16px;
    }

    a,
    ins {
        text-decoration: none;
    }

    a {
        color: #333333;
    }

    a:hover {
        text-decoration: none;
        transition: all 0.2s;
        -webkit-transition: all 0.2s;
        -o-transition: all 0.2s;
        -moz-transition: all 0.2s;
    }

    a:visited,
    a:active,
    a:focus {
        text-decoration: none;
    }

    .contentWidth {
        width: 1160px;
        margin: 0 auto;
    }

    .lf {
        float: left;
    }

    .rf {
        float: right;
    }

    .hidden {
        display: none;
    }

    .clearfix {
        zoom: 1;
    }

    .clearfix:after {
        clear: both;
        content: '';
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;

    }

    /*å¤´éƒ¨æ ·å¼*/
    .header {
        width: 100%;
        height: 80px;
        background: #FFFFFF;
    }

    .header_con>.logo {
        height: 80px;
    }

    #logo {
        width: 196px;
        height: 40px;
        margin-top: 20px;
    }

    .top_search {
        width: 508px;
        height: 40px;
        margin-top: 20px;
        margin-left: 134px;
    }

    #search_logo {
        display: none;
    }

    #search {
        width: 444px;
        height: 40px;
        line-height: 40px;
        background: #f0f0f0;
        text-indent: 16px;
        border-radius: 0px 0px 3px 3px;
    }

    ::placeholder {
        font-size: 14px;
        color: #999999;
    }

    ::-moz-placeholder {
        font-size: 14px;
        color: #999999;
    }

    ::-webkit-input-placeholder {
        font-size: 14px;
        color: #999999;
    }

    #sub_btn {
        width: 64px;
        height: 40px;
        background: #2366BE;
        color: #FFFFFF;
        border-radius: 0 3px 3px 0px;
    }

    .news {
        font-size: 0;
    }

    .news>a {
        color: #999999;
        font-size: 14px;
        line-height: 12px;
        margin-top: 34px !important;
        display: inline-block;
    }

    #jiuban {
        border: 1px solid rgba(187, 187, 187, 0.2);
        border-top: none;
        border-bottom: none;
        padding: 0 12px;
        margin: 0 12px;
    }

    .login_btns {
        display: none;
    }

    /*bannerä¿¡æ¯*/
    .bannerNews {
        width: 100%;
        height: 260px;
        padding: 40px 0;
    }

    .bannerNewsCon_title>h3 {
        max-width: 760px;
        height: 32px;
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 32px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .dqxz {
        min-width: 113px;
        height: 32px;
        background: #F4F6F8;
        border-radius: 16px;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        color: #333333;
        margin-left: 20px;
        cursor: pointer;
    }

    .dqxz>img {
        vertical-align: -3px;
        width: 13px;
        height: 16px;
    }

    .dqxz2 {
        min-width: 113px;
        height: 32px;
        background: #F4F6F8;
        border-radius: 16px;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        color: #333333;
        margin-left: 20px;
        cursor: pointer;
        margin-top: -16px;
    }

    .dqxz2>img {
        vertical-align: -3px;
        width: 13px;
        height: 16px;
    }

    .tjbsdd {
        width: 160px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        /* box-shadow: 0 1px 4px 0 rgba(0,0,0,0.10);
    background-color: #FFFFFF; */
        font-size: 12px;
        color: #333333;
        margin-left: 8px;
        display: none;
        position: absolute;
        left: 140px;
        background: url(http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/script/zjzwfw-2019/ycdtdh_pic/tsqp.png) -2px 1px no-repeat;
        background-size: 100% 100%;
    }

    .btns {
        font-size: 0;
        display: none;
        margin-top: 4px;
    }

    .btns>a,
    .btns1>a {
        display: inline-block;
        width: 120px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 20px;
        font-size: 16px;
    }

    .btns>.xsbl,
    .btns1>.xsbl {
        color: #FFFFFF;
        background: #255BDA;
    }

    .btns>a.xsbl:hover,
    .btns1>a.xsbl:hover {
        background: #184CC5;
        color: #FFFFFF;
    }

    .btns>.zxyy,
    .btns1>.zxyy {
        margin-left: 12px;
        background: #E9EDF7;
        color: #255BDA;
    }

    .btns>.zxyy:hover,
    .btns1>.zxyy:hover {
        background: #255bda;
        color: #FFFFFF;
    }

    .disabled {
        background: #F8F8F8 !important;
        color: #CCC !important;
        cursor: default;
        /*pointer-events: none;*/
    }

    .disabled:hover {}

    .nums {
        margin-top: 20px !important;
        margin-bottom: 24px !important;
    }

    .nums>div {
        /* min-width: 100px; */
        height: 64px;
        margin-right: 20px;
    }

    .nums>div>.num {
        color: #333333;
        font-size: 14px;
        font-weight: bold;
    }

    .nums>div>.num>em {
        font-style: normal;
        font-weight: normal;
        font-size: 36px;
        margin-right: 4px;
    }

    .nums>div>.subtitle {
        font-size: 12px;
        color: #666666;
    }

    .nums>.fgk {
        width: 20px;
        height: 64px;
        border-left: 1px solid #E8E9EC;
    }

    .nums>.zbjsl {
        padding-top: 14px;
    }

    .nums>.zbjsl>.num {
        font-size: 26px;
        line-height: 26px;
        color: #FD8D2D;
        font-weight: normal;
    }

    .nums>.zbjsl>.subtitle {
        margin-top: 7px;
    }

    .nums>.bspj {
        width: 205px;
        padding-top: 14px;
    }

    .nums>.bspj>.pf {
        color: #FD8D2D;
    }

    .nums>.bspj>.pf>.pf_num {
        font-size: 26px;
        color: #FD8D2D;
        letter-spacing: 0;
        line-height: 28px;
        margin-right: 12px;
    }

    #star {
        font-size: 24px;
    }

    .nums>.bspj>.subtitle {
        margin-top: 2px;
    }

    .nums .pj_detail {
        width: 460px;
        margin-right: 0;
    }

    .nums .pj_details {
        min-width: 313px;
        height: 64px;
        border: 1px solid #CCCFD7;
        padding: 20px 0;
        padding-right: 30px;
    }

    .nums .sjx {
        width: 18px;
        height: 18px;
        border: 1px solid #CCCFD7;
        border-right: none;
        border-bottom: none;
        transform: rotate(-45deg);
        margin-right: -9px;
        margin-top: 23px;
        position: relative;
        z-index: 100;
        background: #fff;
    }

    .nums .pj_details>.pj_details_pic {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-left: 20px;
        margin-right: 8px;
    }

    .nums .pj_details>.pj_details_con {
        max-width: 365px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .oldName {
        font-size: 18px;
        color: #333333;
        letter-spacing: 0;
        line-height: 20px;
        padding-top: 12px;
    }

    /*ä¸»ä½“å†…å®¹*/
    .main {
        width: 100%;
        background: #F8F8F8;
        padding-top: 20px;
        padding-bottom: 40px;
        position: relative;
    }

    .leftCon {
        float: left;
        width: 840px;
        background: #FFFFFF;
        padding: 20px;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
    }

    .rightCon {
        float: right;
        width: 300px;
    }

    /*å·¦ä¾§ç”µæ¢¯å¯¼èˆªæ ·å¼*/
    .menu {
        width: 100px;
        top: 30px;
        left: 50%;
        position: absolute;
        margin-left: -700px;
    }

    .menu li {
        width: 100px;
        font-size: 14px;
        height: 40px;
        text-align: right;
        line-height: 40px;
        padding-right: 17px;
        cursor: pointer;
    }

    .menu li a {
        display: inline-block;
        width: 100px;
        vertical-align: middle;
        line-height: 22px;
        color: #666666;
    }

    .menu .on {
        font-size: 20px;
        font-weight: bold;
    }

    .menu .on a {
        color: #255bda;
    }

    /*å·¦ä¾§å†…å®¹*/
    /*åŸºæœ¬ä¿¡æ¯*/
    .jbxx>.jbxx_titles>.jbxx_tit {
        font-size: 0;
    }

    .jbxx>.jbxx_titles>.jbxx_tit>.jbxx_bt {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: bold;
        margin-right: 20px;
    }

    .jbxx>.jbxx_titles>.jbxx_tit>.tips {
        display: inline-block;
        padding: 8px 12px;
        font-size: 12px;
        color: #666666;
        letter-spacing: 0;
        line-height: 12px;
        background: #F4F6F8;
        margin-right: 8px;
        vertical-align: 3px;
    }

    .hx_fg {
        width: 100%;
        height: 20px;
        border-top: 1px solid #E8E9EC;
        margin-top: 13px;
    }

    .jbxx_tables>table {
        border-collapse: collapse;
        width: 1100px;
        border-top: 1px solid #E8E9EC;

    }

    .jbxx_tables>table td {
        border-bottom: 1px solid #E8E9EC;
        border-right: 1px solid #E8E9EC;
        border-left: 1px solid #E8E9EC;
        height: 50px;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        line-height: 13px;
    }

    .jbxx_tables>table .type_title {
        height: 48px;
        text-align: center;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        text-align: center;
        line-height: 14px;
        font-weight: bold;
        padding-top: 5px;
    }

    .jbxx_tables>table .things_title {
        width: 120px;
        background: #F4F6F8;
        padding: 12px 12px;
        line-height: 17px;
    }

    .jbxx_tables>table .things_con {
        width: 280px;
        padding: 12px 12px;
        line-height: 17px;
    }

    .jbxx_tables>table .things_con>div {
        line-height: 20px;
    }

    .jbxx_tables>table .things_con a {
        color: #255bda !important;
    }

    .jbxx_tables>table .things_con a:hover {
        color: #184CC5 !important;
    }

    #table2 {
        border-top: none;
        display: none;
    }

    .jbxx .xsgd {
        width: 100%;
        height: 36px;
        text-align: center;
        background: #F4F6F8;
        line-height: 36px;
        cursor: pointer;
        margin-top: 12px;
        font-size: 12px;
        color: #666666;
        letter-spacing: 0;
    }

    .jbxx .xsgd img {
        vertical-align: -3px;
    }

    .bjsxsm {
        float: left;
        margin-left: 8px;
        cursor: pointer;
        color: #255BDA;
        position: relative;
    }

    .bjsxsm_content {
        width: 355px;
        min-height: 70px;
        text-align: left;
        line-height: 17px;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        padding: 25px 14px 17px 20px;
        position: absolute;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.17);
        z-index: 100;
        display: none;
        left: 130px;
        top: -30px;
    }

    .bjsxsm:hover {
        color: #FF8C50;
    }

    .bjsxsm:hover .bjsxsm_content {
        display: block;
    }

    .underLine_place>.underLine_place_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
        float: left;
    }

    .underLine_place_item {
        width: 100%;
        border: 1px solid #E8E9EC;
        min-height: 70px;
        padding: 20px;
        margin-top: 12px;
    }

    .underLine_place_item:first-child {
        margin-top: 0;
    }

    .underLine_place_item>.address_time {
        width: 690px;
        min-height: 70px;
        line-height: 24px;
    }

    .underLine_place_item>.map {
        width: 66px;
        min-height: 70px;
    }

    .underLine_place_item>.address_time>p {
        font-size: 13px;
        color: #333333;
    }

    .underLine_place_item>.address_time>p>.subTit {
        font-weight: bold;
        float: left;
    }

    .underLine_place_item>.address_time>p>.Cons {
        float: left;
        width: 88%;
    }

    .underLine_place_item>.map>.map_item {
        display: inline-block;
        width: 66px;
        height: 28px;
        border-radius: 14px;
        background: #F4F6F8;
        line-height: 28px;
        text-align: center;
        font-size: 0;
    }

    .underLine_place_item>.map>.map_item>span {
        font-size: 12px;
        color: #666666;
    }

    .underLine_place_item>.map>.map_item>img {
        vertical-align: -3px;
    }

    .sqtj>.sqtj_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
    }

    .sqtj>.sqtj_con .sub_title {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: bold;
        margin-top: 20px;
    }

    .sqtj>.sqtj_con .slxz {
        margin-top: 0;
    }

    .sqtj>.sqtj_con .sub_title>em {
        font-style: normal;
        color: #255BDA;
        font-size: 13px;
        margin-right: 12px;
    }

    .sqtj>.sqtj_con .sltj_con {
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
        padding-top: 12px;
        padding-left: 24px;
    }

    .sbcl>.sbcl_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
    }

    /*ç‚¹å‡»ç”Ÿæˆè¡¨æ ¼*/
    .apply_material .datum-item {
        margin-top: 20px;
    }

    .apply_material .datum-item:first-child {
        margin-top: 0;
    }

    .apply_material_note {
        font-size: 14px;
        color: #999999;
        margin-top: 10px;
    }

    .apply_Form p {
        margin-top: -4px;
        font-size: 13px;
        color: #333333;
    }

    .apply_Form ul li {
        margin-top: 15px;
    }

    .apply_Form input[type='checkbox'] {
        width: 16px;
        height: 16px;
        float: left;
        margin-top: 3px;
        margin-right: 10px;
        background-color: #fff;
        -webkit-appearance: none;
        border: 1px solid #CCC;
        border-radius: 2px;
        outline: none;
        cursor: pointer;
    }

    .apply_Form input[type=checkbox]:checked {
        background: url(http://zjjcmspublic.oss-cn-hangzhou.aliyuncs.com/jcms_files/jcms1/web1/site/script/zjservice/resources/bscx/sxcx/workGuide/images/gounew.png) no-repeat center;
        background-size: cover;
        border: none;
    }

    .apply_material label {
        font-size: 13px;
        color: #333333;
    }

    .Operationbtn {
        margin-top: 25px;
        font-size: 0;
    }

    .Operationbtn>a {
        font-size: 14px;
        cursor: pointer;
        display: inline-block;
        width: 88px;
        height: 32px;
        border-radius: 16px;
        text-align: center;
        line-height: 32px;
    }

    .submits {
        background: #255BDA;
        color: #ffffff;
    }

    .resrt {
        background: #e9edf7;
        color: #255BDA;
        margin-left: 12px;
    }

    .Operationbtn>a.resrt:hover {
        background: #255BDA;
        color: #FFFFFF;
    }

    .Operationbtn>a.submits:hover {
        background: #184CC5;
        color: #FFFFFF;
    }

    .prev,
    .prev1,
    .prevs {
        position: relative;
    }

    .arrow-left,
    .arrow-left1,
    .arrow-lefts {
        width: 50px;
        height: 41px;
        background: #F4F6F8;
        text-align: center;
        line-height: 45px;
        border: 1px solid #E8E9Ec;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        display: none;
    }

    .bh,
    .bh1,
    .sfxmmcBh,
    .bhs {
        width: 32px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        background: #f6f7f9;
        border: 1px solid #E8E9Ec;
        border-top: none;
        font-size: 13px;
    }

    .arrow-right,
    .arrow-right1,
    .arrow-rights {
        position: absolute;
        right: 0px;
        width: 50px;
        height: 41px;
        background: #F6F7F9;
        text-align: center;
        line-height: 45px;
        border: 1px solid #E8E9Ec;
        box-shadow: -2px 0 2px 0 rgba(0, 0, 0, 0.18);
        z-index: 10;
    }

    .clmc,
    .clmcs {
        display: block;
        width: 200px;
        padding: 0 12px;
        font-size: 13px;
        font-weight: bold;
        border: 1px solid #E8E9Ec;
        background: #F4F6F8;
        height: 41px;
        line-height: 40px;
        color: #666666;
    }

    .clmc_con,
    .clmc_cons {
        display: block;
        width: 200px;
        height: 100px;
        border-right: 1px solid #E8E9Ec;
        border-bottom: 1px solid #E8E9Ec;
        line-height: 95px;
    }

    .clmc_con>p,
    .clmc_cons>p {
        width: 167px;
        font-size: 13px;
        color: #333333;
        padding: 16px 12px;
        float: none;
        display: inline-block;
        line-height: 20px;
        vertical-align: middle;
    }

    .lyqd_con,
    .clxs_con,
    .zzclfs_con,
    .clbyx_con,
    .zlxz_con,
    .bz_con,
    .slbz_con,
    .tbxz_con,
    .tgclyj_con,
    .lyqd_cons,
    .clxs_cons,
    .zzclfs_cons,
    .clbyx_cons,
    .zlxz_cons,
    .bz_cons,
    .slbz_cons,
    .tbxz_cons,
    .tgclyj_cons,
    .cllx_con,
    .zzclgg_con {
        width: 120px;
        height: 100px;
        padding: 16px 12px;
        line-height: 66px;
    }

    .xjbj {
        display: inline-block;
        line-height: 20px;
        vertical-align: middle;
    }

    .lyqdsm,
    .cksm {
        font-size: 12px;
        color: #255bda;
        margin-top: 10px;
        cursor: pointer;
        position: relative;
    }

    .lyqd_content {
        width: 400px;
        min-height: 70px;
        text-align: left;
        line-height: 17px;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        padding: 16px;
        position: absolute;
        top: -32px;
        left: 90px;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.17);
        z-index: 100;
        display: none;
    }

    .cksm_content {
        width: 200px;
        min-height: 70px;
        text-align: left;
        line-height: 17px;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        padding: 16px;
        position: absolute;
        left: 60px;
        top: -35px;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.17);
        z-index: 100;
        display: none;
    }

    .lyqdsm:hover,
    .cksm:hover {
        color: #FF8C50;
    }

    .lyqdsm:hover .lyqd_content,
    .cksm:hover .cksm_content {
        display: block;
    }

    /*å…±äº«ææ–™æŒ‰é’®*/
    .gxcl_btn {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 16px;
        background: #EAF1FA;
        margin-top: 20px;
    }

    .gxcl_btn>img {
        width: 24px;
        height: 24px;
        vertical-align: -6px;
    }

    .gxcl_btn>.txxx {
        font-size: 16px;
        color: #333333;
    }

    .gxcl_btn>.txxx>em {
        font-style: normal;
        color: #FF082E;
        margin: 0 4px;
    }

    .gxcl_btn>.ckcl {
        font-size: 16px;
        color: #255bda;
        cursor: pointer;
    }

    .gxcl_btn>.ckcl:hover {
        color: #184CC5;
    }

    .gxcl_btn>.ckcl_btn {
        font-size: 16px;
        color: #255bda;
        cursor: pointer;
    }

    .gxcl_btn>.ckcl_btn:hover {
        color: #184CC5;
    }

    .bllc>.bllc_title>.bllcTit {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: bold;
    }

    .bllc>.bllc_title>.tips {
        display: inline-block;
        background: #F4F6F8;
        padding: 8px 12px;
        font-size: 12px;
        color: #666666;
        margin-left: 16px;
        vertical-align: 4px;
    }

    .bllc_con {
        line-height: 24px;
        color: #333333;
        font-size: 13px;
    }

    .bllc_con table {
        width: 100% !important;
        border: 1px solid #E8E9EC !important;
        border-right: none !important;
        border-bottom: none !important;
        border-collapse: collapse;
    }

    .bllc_con table td {
        border: 1px solid #E8E9EC !important;
        border-left: none !important;
        border-top: none !important;
        padding: 12px;
    }

    .bllc>.lc_btn {
        display: block;
        background: #255BDA;
        border-radius: 20px;
        width: 115px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        color: #FFFFFF;
        margin-top: 20px;
    }

    .bllc>.lc_btn>img {
        vertical-align: -3px;
    }

    .bllc>.lc_btn:hover {
        background: #184CC5;
    }

    .sfbz>.sfbz_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
    }

    .sfbz .sub_title {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: bold;
        margin-top: 20px;
    }

    .sfbz .sub_title>em {
        font-style: normal;
        color: #255BDA;
        font-size: 13px;
        margin-right: 12px;
    }

    .sfbz_tables {
        width: 100%;
        margin-top: 20px;
    }

    .sfbz_tables_content {
        width: 100%;
        border: 1px solid #E0E2E7;
        border-right: none;
        border-bottom: none;
    }

    .sfbz_tables_head {
        font-size: 0;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }

    .sfbz_tables_head>span {
        float: left;
        font-size: 13px;
        height: 40px;
        font-weight: bold;
        border-right: 1px solid #E0E2E7;
        border-bottom: 1px solid #E0E2E7;
        background: #F4F6F8;
    }

    .sfbz_prev {
        width: 205px;
    }

    .arrow-right2,
    .arrow-left2 {
        display: none;
    }

    .sfxmmc {
        display: block;
        width: 207px;
        height: 41px;
        background: #F4F6F8;
        padding-left: 43px;
        line-height: 41px;
        font-size: 13px;
        font-weight: bold;
        border: 1px solid #E8E9EC;
        border-right: none;
    }

    .sfxmmc_con {
        width: 173px;
        height: 100px;
        padding: 16px 12px;
        border-bottom: 1px solid #E8E9EC;
        font-size: 13px;
        line-height: 66px;
    }

    .sfbz_tables_head>.sfbiaoz,
    .sfbz_tables_head>.sfyxjm,
    .sfbz_tables_head>.yxjmyj,
    .sfbz_tables_head>.sfbzu {
        width: 148px;
        padding-left: 12px;
    }

    .sfbz_tables_item {
        font-size: 0;
        width: 100%;
        height: 100px;
    }

    .sfbz_tables_item>span {
        float: left;
        font-size: 13px;
        height: 100px;
        border-right: 1px solid #E0E2E7;
        border-bottom: 1px solid #E0E2E7;
        line-height: 66px;
    }

    .sfbz_tables_item>.sfbzBh {
        width: 32px;
        text-align: center;
        line-height: 100px;
        background: #F4F6F8;
    }

    .sfbz_tables_item>.sfxmmc_con {
        width: 175px;
        padding: 16px 12px;
    }

    .sfbz_tables_item>.sfbz_con,
    .sfbz_tables_item>.sfyxjm_con,
    .sfbz_tables_item>.yxjmyj_con,
    .sfbz_tables_item>.sfbzu_con {
        width: 148px;
        padding: 16px 12px;
    }

    .sfbz_tables_item p,
    .gxcl_tables_item p,
    .prev p,
    .sfbz_prev p,
    .prev1 p {
        display: inline-block;
        line-height: 17px;
        vertical-align: middle;
    }

    .sfbz_tables_item>span a {
        display: block;
        color: #33A0E5;
    }

    .sfyjCon {
        padding-left: 23px;
        margin-top: 16px;
        font-size: 13px;
    }

    .cjwt>.cjwt_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
    }

    .cjwt>.cjwt_table>table {
        width: 100%;
        /* height: 180px; */
        border-collapse: collapse;
        border: 1px solid #E0E2E7;
        border-right: none;
        border-bottom: none;
        font-size: 12px;
    }

    .cjwt>.cjwt_table>table td {
        border-right: 1px solid #E0E2E7;
        border-bottom: 1px solid #E0E2E7;
    }

    .cjwt>.cjwt_table>table .cjwtBh {
        width: 32px;
        height: 90px;
        background: #F4F6F8;
        text-align: center;
    }

    .cjwt>.cjwt_table>table .cjwtCon {
        padding: 13px;
    }

    .question {
        margin-bottom: 11px;
        font-weight: bold;
    }

    .key {
        font-size: 14px;
    }

    .sdyj>.sdyj_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
    }

    .sdyj_item>.sub_title {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: bold;
        margin-top: 20px;
    }

    .sdyj_item>.sub_title>em {
        font-style: normal;
        color: #255BDA;
        font-size: 13px;
        margin-right: 12px;
    }

    .sdyj_item>.sdyj_con {
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
        padding-top: 12px;
        padding-left: 24px;
    }

    /*å³ä¾§å†…å®¹*/
    .right_pj {
        width: 100%;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
        display: none;
    }

    .right_con1 {
        padding-bottom: 16px;
        border-bottom: 1px solid #E8E9EC;
    }

    .right_con1>div {
        width: 72px;
        height: 44px;
    }

    .right_con1>.dxccs {
        width: 60px;
    }

    .right_con1>.fdbjsx {
        margin: 0 28px;
    }

    .right_con1>div>.num {
        color: #333333;
        font-size: 12px;
        font-weight: bold;
    }

    .right_con1>div>.num>em {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        margin-right: 4px;
    }

    .right_con1>div>.subtitle {
        font-size: 12px;
        color: #666666;
    }

    .right_con2 {
        margin-top: 15px;
    }

    .right_con2>.bspj {
        width: 190px;
        padding-top: 14px;
    }

    .right_con2>.bspj>.pf {
        color: #FD8D2D;
    }

    .right_con2>.bspj>.pf>.pf_num {
        font-size: 24px;
        color: #FD8D2D;
        letter-spacing: 0;
        line-height: 28px;
        margin-right: 12px;
    }

    #stars {
        font-size: 20px;
    }

    .right_con2>.bspj>.subtitle {
        margin-top: 2px;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        line-height: 12px;
    }

    .right_con2>.ckpj {
        font-size: 12px;
        color: #666666;
        letter-spacing: 0;
        line-height: 12px;
        margin-top: -12px;
    }

    .right_con2>.ckpj img {
        vertical-align: -3px;
    }

    .ways {
        width: 100%;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
    }

    .zxfs {
        padding-bottom: 12px;
        border-bottom: 1px solid #E8E9EC;
    }

    .zxfs>.zxfs_title {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
    }

    .zxfs>.zxfs_con {
        margin-top: 12px;
        font-size: 13px;
        line-height: 24px;
    }

    .zxfs>.zxfs_con .zxfsTit {
        float: left;
        width: 68px;
        font-weight: bold;
    }

    .zxfs>.zxfs_con .zxfsCon {
        float: left;
        display: inline-block;
        width: 188px;
        word-break: break-all;
    }

    .jdtsfs>.jdtsfs_con .zxfsTit {
        float: left;
        width: 68px;
        font-weight: bold;
    }

    .jdtsfs>.jdtsfs_con .zxfsCon {
        float: left;
        display: inline-block;
        width: 188px;
        word-break: break-all;
    }

    /*ç›‘ç£æŠ•è¯‰æ–¹å¼*/
    .jdtsfs {
        margin-top: 15px;
        padding-bottom: 12px;
        border-bottom: 1px solid #E8E9EC;
    }

    .jdtsfs>.jdtsfs_title {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
    }

    .jdtsfs>.jdtsfs_con {
        margin-top: 12px;
        font-size: 13px;
        line-height: 24px;
    }

    .jdtsfs>.jdtsfs_con .jdtsfsTit {
        float: left;
        width: 68px;
        font-weight: bold;
    }

    .jdtsfs>.jdtsfs_con .jdtsfsCon {
        float: left;
        display: inline-block;
        width: 188px;
        word-break: break-all;
    }

    /* .jdtsfs>.jdtsfs_con .tswzCon{
    color: #316CF1;
} */
    .jdtsfs_btn,
    .jdtsfs_btns {
        margin-top: 15px;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
    }

    .jdtsfs_btn>a:hover,
    .jdtsfs_btns>a:hover {
        color: #255BDA;
    }

    .jdtsfs_btns {
        display: none;
    }

    .jdtsfs_btn img,
    .jdtsfs_btns img {
        vertical-align: -3px;
        margin-right: 8px;
        width: 16px;
        height: 16px;
    }

    .jdtsfs_btn .jdts_sx,
    .jdtsfs_btns .jdts_sx {
        color: #E8E9EC;
        font-size: 14px;
        margin: 0 38px;
    }

    /*ç›¸å…³æœåŠ¡*/
    .about {
        width: 100%;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.10);
        border-radius: 4px;
        margin-top: 20px;
        display: none;
    }

    .about>.ssbm {
        border-bottom: 1px solid #E8E9EC;
    }

    .about>.ssbm>h3 {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
    }

    .about .ssbmCon {
        padding: 16px 0;
    }

    .about .ssbmCon a {
        font-size: 13px;
        color: #316CF1;
        letter-spacing: 0;
        line-height: 13px;
    }

    .about>.xgfw {
        margin-top: 15px;
        border-bottom: 1px solid #E8E9EC;
        display: none;
    }

    .about>.xgfw>h3 {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
    }

    .about .xgfwCon {
        padding: 16px 0;
    }

    .about .xgfwCon a {
        font-size: 13px;
        color: #255bda;
        letter-spacing: 0;
        line-height: 13px;
        margin-right: 5px;
    }

    .about .xgfwCon a:hover {
        color: #184CC5;
    }

    .about>.ztjcfw {
        margin-top: 15px;
    }

    .about>.ztjcfw>h3 {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
    }

    .about .ztjcfwCon {
        padding-top: 16px;
    }

    .about .ztjcfwCon a {
        font-size: 13px;
        color: #316CF1;
        letter-spacing: 0;
        line-height: 13px;
        margin-right: 5px;
    }


    /*åº•éƒ¨æ ·å¼*/
    .footer {
        width: 100%;
        background: #1355AB;
        height: 360px;
    }

    .footer_con {
        padding-top: 60px;
    }

    .footer_con>.lxwm {
        width: 360px;
        height: 150px;
    }

    .footer_con>.lxwm>h5 {
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 20px;
    }

    .footer_con>.lxwm>.lxwm_con {
        margin-top: 17px;
        line-height: 28px;
        font-size: 13px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 28px;
        opacity: 0.6;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60);
    }

    .footer_con>.xgzd {
        width: 420px;
        height: 150px;
        padding-left: 60px;
        border-left: 1px solid rgba(197, 200, 207, 0.1);
        border-right: 1px solid rgba(197, 200, 207, 0.1)
    }

    .footer_con>.xgzd>h5 {
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 20px;
    }

    .xgzd_con_item {
        margin-top: 17px;
        margin-right: 36px;
    }

    .xgzd_con_item>a {
        display: block;
        font-size: 13px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 28px;
        opacity: 0.6;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60);
    }

    .other_more {
        width: 380px;
        height: 150px;
        padding-left: 79px;
    }

    .other_more_con {
        margin-top: 22px;
    }

    .other_more_con>.zlb {
        width: 72px;
        margin-right: 80px;
    }

    .other_more_con>.zlb>img {
        width: 72px;
        height: 72px;
    }

    .other_more_con>.zlb>p {
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 12px;
        opacity: 0.6;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60);
    }

    .other_more_con>.zfb>img {
        width: 72px;
        height: 72px;
    }

    .other_more_con>.zfb>p {
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        line-height: 12px;
        opacity: 0.6;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60);
    }

    .fgx {
        height: 30px;
        border-bottom: 1px solid rgba(197, 200, 207, 0.1);
    }

    .copyRight {
        padding-top: 21px;
    }

    .copyRightCon {
        width: 474px;
        margin: 0 auto;
    }

    .copyRightCon>li {
        float: left;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 12px;
    }

    .copyRightCon>.foot_sx {
        /* margin: 0 15px; */
    }

    .copyRightCon>li>a {
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 12px;
    }

    .foot_ba {
        width: 696px;
        margin: 0 auto;
    }

    .foot_ba_con {
        margin-top: 19px;
    }

    .foot_ba_con span {
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
        line-height: 20px;
        opacity: 0.6;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=60);
    }

    .foot_ba_con .zbdw {
        margin-right: 33px;
    }

    .foot_ba_con .beian {
        margin-right: 32px;
    }

    .foot_ba_con .zwym {
        margin-left: 26px;
        margin-right: 34px;
    }

    .dzjg>img {
        width: 27px;
        height: 33px;
        margin-top: 23px;
        margin-left: 15px;
        margin-right: 19px;
    }

    .jiucuo>img {
        width: 46px;
        height: 23px;
        margin-top: 26px;
    }

    /*å¼¹å±‚æ ·å¼*/
    /*å…±äº«ææ–™å¼¹å±‚*/
    .gxcl_details {
        width: 880px;
        max-height: 480px;
        background: #ffffff;
        position: fixed;
        left: 50%;
        margin-left: -440px;
        margin-top: -240px;
        top: 50%;
        padding: 20px 40px;
        z-index: 1001;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.20);
        overflow-y: auto;
        display: none;
    }

    .gxcl_details>.btn_close {
        text-align: right;
        width: 820px;
        position: fixed;
    }

    .gxcl_details>.btn_close>img {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .gxcl_details>.btn_closes {
        text-align: right;
        width: 820px;
        position: fixed;
    }

    .gxcl_details>.btn_closes>img {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .gxcl_details .gxcl_title {
        text-align: left;
        font-size: 21px;
        color: #333333;
        letter-spacing: 0;
        line-height: 28px;
        height: 28px;
        font-weight: bold;
    }

    .gxcl_details .gxcl_tips {
        text-align: left;
        font-size: 13px;
        color: #999999;
        letter-spacing: 0;
        margin-left: 10px;
        vertical-align: text-bottom;
    }

    .gxcl_table_con {
        width: 800px;
        margin-top: 20px;
        position: relative;
    }

    .gxcl_tables {
        width: 1320px !important;
    }

    .gxcl_tables_head {
        font-size: 0;
        width: 100%;
        border-top: 1px solid #e8e9ec;
    }

    .gxcl_tables_head>span {
        font-size: 13px;
        font-weight: bold;
        border-right: 1px solid #E8E9Ec;
        border-bottom: 1px solid #E8E9Ec;
        background: #F4F6F8;
        height: 40px;
        line-height: 40px;
        color: #666666;
        float: left;
    }

    .clmc1 {
        display: block;
        width: 200px;
        padding: 0 12px;
        font-size: 13px;
        font-weight: bold;
        border: 1px solid #E8E9Ec;
        background: #F4F6F8;
        height: 41px;
        line-height: 40px;
        color: #666666;
    }

    .gxcl_tables_head>.lyqd1,
    .clxs1,
    .zzclfs1,
    .clbyx1,
    .zlxz1,
    .bz1,
    .slbz1,
    .tbxz1,
    .tgclyj1,
    .cllx1,
    .zzclgg1 {
        width: 120px;
        padding: 0 12px;
    }

    .clmc_con1 {
        display: block;
        width: 200px;
        height: 100px;
        border-right: 1px solid #E8E9Ec;
        border-bottom: 1px solid #E8E9Ec;
        line-height: 95px;
    }

    .clmc_con1>p {
        width: 167px;
        font-size: 13px;
        color: #333333;
        padding: 16px 12px;
        float: none;
        display: inline-block;
        line-height: 20px;
        vertical-align: middle;
    }

    .lyqd_con1,
    .clxs_con1,
    .zzclfs_con1,
    .clbyx_con1,
    .zlxz_con1,
    .bz_con1,
    .slbz_con1,
    .tbxz_con1,
    .tgclyj_con1,
    .cllx_con1,
    .zzclgg_con1 {
        width: 120px;
        height: 100px;
        padding: 16px 12px;
        line-height: 66px;
    }

    .gxcl_tables_item {
        font-size: 0;
        width: 100%;
        height: 100px;
    }

    .gxcl_tables_item>span {
        float: left;
        font-size: 12px;
        border-right: 1px solid #E8E9Ec;
        border-bottom: 1px solid #E8E9Ec;
    }

    .gxcl_tables_item>span a {
        display: block;
        color: #33A0E5;
    }

    .lyqdsm1,
    .cksm1 {
        font-size: 12px;
        color: #316CF1;
        margin-top: 10px;
        cursor: pointer;
        position: relative;
    }

    .lyqd_content1 {
        width: 400px;
        min-height: 70px;
        text-align: left;
        line-height: 17px;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        padding: 16px;
        position: absolute;
        top: -32px;
        left: 90px;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.17);
        z-index: 100;
        display: none;
    }

    .cksm_content1 {
        width: 200px;
        min-height: 70px;
        text-align: left;
        line-height: 17px;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0;
        padding: 16px;
        position: absolute;
        left: 60px;
        top: -35px;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.17);
        z-index: 100;
        display: none;
    }

    .lyqdsm1:hover,
    .cksm1:hover {
        color: #FF8C50;
    }

    .lyqdsm1:hover .lyqd_content1,
    .cksm1:hover .cksm_content1 {
        display: block;
    }

    .gb_btn {
        display: block;
        width: 96px;
        height: 34px;
        border-radius: 17px;
        background: #255BDA;
        color: #FFFFFF;
        font-size: 16px;
        text-align: center;
        line-height: 34px;
        margin-top: 20px;
    }

    .gb_btn:hover {
        background: #184CC5;
        color: #FFFFFF;
    }

    .gb_btns {
        display: block;
        width: 96px;
        height: 34px;
        border-radius: 17px;
        background: #255BDA;
        color: #FFFFFF;
        font-size: 16px;
        text-align: center;
        line-height: 34px;
        margin-top: 20px;
    }

    .gb_btns:hover {
        background: #184CC5;
        color: #FFFFFF;
    }

    #zzc {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1000;
        left: 0px;
        top: 0px;
        background: #20242C;
        opacity: 0.5;
        filter: progid:DXImageTransform.Microsoft.Alpha(opacity=50);
        display: none;
    }

    .lct_details {
        width: 880px;
        max-height: 480px;
        background: #ffffff;
        position: fixed;
        left: 50%;
        margin-left: -440px;
        margin-top: -240px;
        top: 50%;
        z-index: 1001;
        box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.20);
        overflow-y: auto;
        display: none;
        padding: 15px;
    }

    .lct_details>.btn_close1 {
        text-align: right;
        width: 834px;
        position: fixed;
    }

    .lct_details>.btn_close1>img {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    #table3,
    #table4,
    .sfbz_table_con1,
    .foot_btn {
        display: none;
    }

    .xq_list .xq_list1>a {
        color: #999999;
        cursor: default;
    }

    .xq_more {
        cursor: pointer;
        display: block;
        width: 29px;
        height: 24px;
        font-size: 13px;
        color: #33A0E5;
        letter-spacing: 0;
        text-align: center;
        line-height: 1.5;
        float: right;
        position: relative;
    }

    .xq_list {
        display: none;
        position: absolute;
        left: -380px;
        z-index: 100;
        padding-top: 8px;
    }

    .xq_more:hover .xq_list {
        display: block;
    }

    .xq_list a {
        display: block;
        border: 1px solid #eee;
        border-radius: 3px;
        font-size: 14px;
        color: #333;
        line-height: 24px;
        width: 416px;
        text-align: left;
        padding: 16px;
        background: #fff;
        box-shadow: #eee 0px 0px 5px 2px;
    }

    .gxcl_details_phone {
        display: none;
    }

    .tbcx {
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        line-height: 16px;
        font-weight: bold;
        margin-top: 20px;
    }

    .tbcx>em {
        font-style: normal;
        color: #255BDA;
        font-size: 13px;
        margin-right: 12px;
    }

    .tbcxCon {
        padding-left: 23px;
        margin-top: 16px;
        font-size: 13px;
        color: #333333;
    }

    .zxwzCon,
    .tswzCon {
        color: #255bda;
    }

    .zxwzCon:hover,
    .tswzCon:hover {
        color: #184CC5;
    }

    .jnmb {
        display: inline-block;
        line-height: 20px !important;
        vertical-align: middle;
    }

    .dowloadss {
        display: inline-block;
        line-height: 20px;
        vertical-align: middle;
    }

    .bsddgd {
        width: 100%;
        height: 36px;
        text-align: center;
        background: #F4F6F8;
        line-height: 36px;
        cursor: pointer;
        margin-top: 12px;
        font-size: 12px;
        color: #666666;
        letter-spacing: 0;
        display: none;
    }

    .bsddgd img {
        vertical-align: -3px;
    }

    .qp {
        position: absolute;
        left: -22px;
        top: 18%;
    }

    .lbsxqd>.sfbz_title>h3 {
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
    }

    #zyclbz>table {
        width: 100%;
        border: 1px solid #E8E9EC;
        border-right: none;
        border-bottom: none;
        border-collapse: collapse;
        font-size: 13px;
        color: #333333;
    }

    #zyclbz>table td {
        height: 50px;
        border: 1px solid #E8E9EC;
        border-left: none;
        border-top: none;
        text-align: center;
        padding: 12px;
    }

    #zyclbz>table .zy_xh {
        width: 10%;
        background: #F4F6F8;
    }

    #zyclbz>table .zy_qx {
        width: 45%;
        background: #F4F6F8;
    }

    #zyclbz>table .zy_cf {
        width: 45%;
        background: #F4F6F8;
    }

    #cfjycx {
        height: 280px;
    }

    .sbcl_table {
        font-size: 13px;
        width: 98%;
        height: 341px;
        border-right: 1px solid #E8E9Ec;
        border-bottom: 1px solid #E8E9Ec
    }

    .sbcl_table td {
        border-left: 1px solid #E8E9Ec;
        border-top: 1px solid #E8E9Ec;
        padding: 0 12px;
        font-size: 13px;
    }

    .sbcl_table thead td {
        font-size: 13px;
        font-weight: bold;
        color: #666666;
    }

    .sbcl_table thead {
        background: #F4F6F8;
    }

    .sbcl_table thead tr {
        height: 41px;
    }

    .sbcl_table tbody tr .bg_gary {
        background: #F4F6F8;
        width: 32px;
        text-align: center;
    }
</style>