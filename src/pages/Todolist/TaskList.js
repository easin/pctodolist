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
  Select,
} from 'antd';

import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Result from '@/components/Result';

import styles from './TaskList.less';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const { Search, TextArea } = Input;

@connect(({ task, loading }) => ({
    task,
  loading: loading.models.task,
}))
@Form.create()
class TaskList extends PureComponent {
  state = { visible: false, done: false,taskName:'' };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetchTaskList',
      payload: {
        pageSize: 2,
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
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
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
    //   `task.taskPage`: { taskPage },
    //   loading,
    // } = this.props;
    //   console.log(1111111)
      // const {taskPage: { taskPage }}= this.props;
      // console.log(taskPage)
      const {task: { taskPage },loading,}= this.props;
      // console.log(taskPage)
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

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: {id, taskName, createdTime,endTime,status, isArchived } ,itemIndex}) => {
        console.log('渲染呢')
        this.setState({"taskName":taskName});
        return (

          <div className={styles.listContent}>
            <div className={[styles.listContentItem]}>

              <p className={styles.line}>{itemIndex}. {taskName}</p>
            </div>
            <TextArea
              style={{ minHeight: 32 }}
              placeholder="请输入任务"
              // rows={4}
              autosize
              onChange={e => {
                  e.preventDefault();
                  console.log(e.target.value)}}

              value={this.state.taskName}
              onPressEnter={()=>{alert(1)}}
            />
            <div className={styles.listContentItem}>
              <p>{moment(createdTime).format('YYYY-MM-DD')}</p>
            </div>
            <div className={styles.listContentItem}>
              <p>{isArchived===0?'未归档':'已归档'}</p>
            </div>
            <div className={styles.listContentItem}>
              <p><a
                onClick={e => {
                      e.preventDefault();
                      const data={ taskName, createdTime,endTime,status, isArchived }
                      this.showEditModal(data);
                  }}
              >
                  编辑
                 </a>
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
          <FormItem label="备忘名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入备忘名称' }],
              initialValue: current.title,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="备忘负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{ required: true, message: '请选择备忘负责人' }],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{ message: '请输入至少五个字符的产品描述！', min: 5 }],
              initialValue: current.subDescription,
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
                    <div className={styles.standardList}>
                      <List
                        size="small"
                        rowKey="id"
                        loading={loading}
                        // pagination={paginationProps}
                        dataSource={taskPage.list}
                        renderItem={(item,index) => (
                          <List.Item>

                            <ListContent data={item} itemIndex={index+1} />
                          </List.Item>
                                )}
                      />
                    </div>
                    <Modal
                      title={done ? null : `任务${current ? '编辑' : '添加'}`}
                      className={styles.standardListForm}
                      width={640}
                      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
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
}

export default TaskList;
