import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  DatePicker,
  Select,Spin,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Result from '@/components/Result';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './TaskList.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ task, loading }) => ({
    task,
    todayLoading: loading.models.task, // 监听指定模块
  // loading: loading.effects['task/fetchTaskList'], //监听单个
  // loading: loading.effects['task/fetchTaskList','task/markTaskName'],//监听指定的多个
  // loading: loading.global() //监听全局

    //
}))
@Form.create()
class TaskList extends PureComponent {
  state = { visible: false, done: false,taskName:'' };

  formLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  };


  handleInfiniteOnLoad = () => {
      const { dispatch,task:{todayTaskPage:{pageNo,totalPage,pageSize}} } = this.props;
      if(pageNo<totalPage)
      {
          dispatch({
              type: 'task/fetchTodayTaskList',
              payload: {
                  pageNo:pageNo+1,
                  pageSize,
              },
          });
      }

  }

  componentDidMount() {
    const { task:{todayTaskPage:{pageNo,pageSize}},dispatch } = this.props;
        dispatch({
            type: 'task/fetchTodayTaskList',
            payload: {
                pageNo,
                pageSize,
            },
        });
  }

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : null;

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'task/save',
        payload: { id, ...fieldsValue },
      });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {


    // const {
    //   `task.todayTaskPage`: { todayTaskPage },
    //   loading,
    // } = this.props;
    //   console.log(1111111)
      // const {todayTaskPage: { todayTaskPage }}= this.props;
      // console.log(todayTaskPage)
      const {task: { todayTaskPage },todayLoading}= this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除备忘',
          content: '确定删除该备忘吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>

        <Button
          type="primary"
          icon="plus"

          onClick={this.showModal}
          ref={component => {
                      /* eslint-disable */
                      this.addBtn = findDOMNode(component);
                      /* eslint-enable */
                  }}
        >
              添加待办
        </Button>
        <RadioGroup defaultValue="all" className={styles.extraContentSearchGap}>
          <RadioButton value="all">全部含完成</RadioButton>
          <RadioButton value="progress">待办</RadioButton>
        </RadioGroup>
        <RadioGroup defaultValue="all" className={styles.extraContentSearchGap}>
          <RadioButton value="all">全部含已归档</RadioButton>
          <RadioButton value="progress">未归档</RadioButton>
        </RadioGroup>
        <Search className={[styles.extraContentSearch,styles.extraContentSearchGap]} placeholder="请输入" onSearch={() => ({})} />
      </div>
    );


    const ListContent = ({ data: {id, taskName, createdTime,endTime,status,cate,tagIds,priority, isArchived,remark,sort } ,itemIndex}) => {
        return (

          <div className={[styles.listContent]}>


            <div className={[styles.listContentItem,styles.line]} >
                <div className={styles.line}>{itemIndex}. {taskName}</div>
            </div>

            <div className={styles.listContentItem}>
              <p>{moment(createdTime).format('YYYY-MM-DD')}</p>
            </div>
            <div className={styles.listContentItem}>
              <p>{isArchived===0?'未归档':'已归档'}


                <Icon type="calendar" onClick={()=>{alert(2)}} />
                <Icon type="calendar" onClick={()=>{alert(2)}} />
                <Icon type="calendar" onClick={()=>{alert(2)}} />
              </p>


            </div>

            <div className={styles.listContentItem}>
              <p>{status===0?(<Icon type="check" />):'已归档'}</p>
            </div>
            <div className={styles.listContentItem}>
              <p><a
                onClick={e => {
                      e.preventDefault();
                      const data={id, taskName, createdTime,endTime,status,cate,tagIds,priority, isArchived,remark,sort }
                      this.showEditModal(data);
                  }}
              >编辑</a>
              </p>
            </div>

          </div>
    )};

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.current)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">删除</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
            <FormItem {...this.formLayout} label="任务">
                {getFieldDecorator('subDescription', {
                    rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
                    initialValue: current.taskName,
                })(<TextArea rows={8} placeholder="请输入至少五个字符" />)}
            </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('endTime', {
              rules: [{ required: true, message: '请选择结束时间' }],
              initialValue: current.endTime ? moment(current.endTime) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="优先级别" {...this.formLayout}>
            {getFieldDecorator('priority', {
              rules: [{ required: true, message: '请选择级别' }],
              initialValue: current.priority,
            })(
              <Select placeholder="请选择">
                <SelectOption value="1">1</SelectOption>
                <SelectOption value="2">2</SelectOption>
                <SelectOption value="3">3</SelectOption>
                <SelectOption value="4">4</SelectOption>
                <SelectOption value="5">5</SelectOption>
              </Select>
            )}
          </FormItem>

            <FormItem label="排序" {...this.formLayout}>
                {getFieldDecorator('sort', {
                    rules: [{ required: true, message: '请选择级别' }],
                    initialValue: current.sort,
                })(
                    <Input placeholder="请输入" />
                )}
            </FormItem>
            <FormItem label="备忘名称" {...this.formLayout}>
                {getFieldDecorator('remark', {
                    rules: [{ required: true, remark: '其他备注' }],
                    initialValue: current.remark,
                })(<TextArea rows={4} placeholder="请输入至少五个字符" />)}
            </FormItem>
        </Form>
      );
    };
      return (
        <GridContent className={styles.userCenter}>
          <Row gutter={24}>

            <Col lg={24} md={24}>
              <div className={styles.standardList}>
                <Card
                  className={styles.listCard}
                  bordered={false}
                  title="我的待办"
                  style={{ marginTop: 0 }}
                  bodyStyle={{ padding: '0 0 0 0' }}
                  extra={extraContent}
                >

                  <Col lg={8} md={24}>
                    <div className={[styles.standardList]}>
                      <div className={styles.taskContainer}>
                        <InfiniteScroll
                          initialLoad={false}
                          pageStart={0}
                          loadMore={this.handleInfiniteOnLoad}
                          hasMore={!todayLoading && todayTaskPage.totalPage>todayTaskPage.pageNo}
                          useWindow={false}
                        >
                          <List
                            size="small"
                            rowKey="id"
                            loading={todayLoading}
                        // pagination={paginationProps}
                            dataSource={todayTaskPage.list}
                            renderItem={(item,index) => (
                              <List.Item>

                                <ListContent data={item} itemIndex={index+1} />
                              </List.Item>
                                )}
                          >
                            {todayLoading && todayTaskPage.totalPage>todayTaskPage.pageNo && (
                              <div className={styles.demoLoadingContainer}>
                                <Spin />
                              </div>
                          )}
                          </List>
                        </InfiniteScroll>
                      </div>
                    </div>
                    <Modal
                      title={done ? null : `任务${current ? '编辑' : '添加'}`}
                      className={styles.standardListForm}
                      width={1024}
                      style={{top:10}}
                      bodyStyle={done ? { marginTop:72 } : { marginTop:10}}
                      destroyOnClose
                      visible={visible}
                      {...modalFooter}
                    >
                      {getModalContent()}
                    </Modal>

                  </Col>
                  <Col lg={8} md={24} />
                  <Col lg={8} md={24} />



                </Card>
              </div>




            </Col>
          </Row>
        </GridContent>

      )
      ;
  }

    markTaskName(id, taskName) {
        const { dispatch } = this.props;
        dispatch({
            type: 'task/markTaskName',
            payload: {
                id,taskName
            },
        });
    }
}

export default TaskList;
