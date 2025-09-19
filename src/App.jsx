import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  Button,
  Dialog,
  Form,
  Input,
  Layout,
  Link,
  Select,
  Space,
  Table,
  Textarea
} from "tdesign-react";
import {create, remove, sort, update} from "./store/slice/book.js";

function App() {
  const {list} = useSelector((state) => state.book);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [model, setModel] = useState({
    id: "",
    name: "",
    price: "",
    category: "",
    description: "",
  })
  const [sortKey, setSortKey] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  // 打开弹窗
  const openModal = (row) => {
    if (row != null) {
      setModel(row);
      form.setFieldsValue(row);
    } else {
      setModel({
        id: "",
        name: "",
        price: "",
        category: "",
        description: "",
      })
      form.reset();
    }
    setVisible(true);
  }

  // 为表单指定字段设置数据值
  const setModelProp = (key, value) => {
    setModel(prevState => {
      return {
        ...prevState,
        [key]: value
      }
    })
  }

  // 提交表单数据
  const handleSubmit = () => {
    if (model.id) {
      dispatch(update(model));
    } else {
      dispatch(create(model));
    }
    setVisible(false);
  }

  // 单个删除操作，当设置多选时需要过滤掉已删除的
  const handleRemove = (row) => {
    dispatch(remove([row.id]));
    setSelectedRowKeys(prevState => prevState.filter(item => item !== row.id));
  }

  // 多个删除操作，如果数据长度为0则不进行任何操作
  const handleBatchRemove = () => {
    if (selectedRowKeys.length === 0) {
      return
    }
    dispatch(remove(selectedRowKeys));
    setSelectedRowKeys([]);
  }

  // 排序筛选操作
  const handleSortChange = (value) => {
    dispatch(sort(value));
    setSortKey(value);
  }

  // 多选选中操作
  const handleSelectChange = (value) => {
    setSelectedRowKeys(value);
  }
  return (
    <Layout>
      <div className="p-4 min-h-[100vh]">
        <Space className="w-full" direction="vertical">
          <div className="flex justify-between">
            <Space>
              <Button content="添加书籍" onClick={() => openModal()}/>
              <Button
                content="批量删除"
                theme="danger"
                disabled={!selectedRowKeys.length}
                onClick={handleBatchRemove}
              />
            </Space>
            <Space>
              <Select
                label="排序："
                value={sortKey}
                options={[
                  {label: "书名", value: "name"},
                  {label: "价格", value: "price"},
                ]}
                clearable
                onChange={handleSortChange}
              />
            </Space>
          </div>
          <Table
            rowKey="id"
            data={list}
            columns={[
              {colKey: 'row-select', type: 'multiple'},
              {colKey: "id", title: "编号"},
              {colKey: "name", title: "书名"},
              {colKey: "price", title: "价格"},
              {colKey: "category", title: "类别"},
              {colKey: "description", title: "描述", ellipsis: true},
              {
                title: "操作",
                colKey: "operation",
                cell: ({row}) => (
                  <Space>
                    <Link theme="primary" onClick={() => openModal(row)}>编辑</Link>
                    <Link theme="danger" onClick={() => handleRemove(row)}>删除</Link>
                  </Space>
                )
              },
            ]}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={handleSelectChange}
          />
        </Space>
      </div>
      {/* 弹窗 */}
      <Dialog
        header={model.id ? '编辑书籍' : '添加书籍'}
        visible={visible}
        confirmOnEnter
        onClose={() => setVisible(false)}
        onConfirm={handleSubmit}
      >
        <Form form={form}>
          <Form.FormItem name="name">
            <Input
              value={model.name}
              placeholder="请输入书名"
              onChange={(val) => setModelProp('name', val)}
            />
          </Form.FormItem>
          <Form.FormItem name="price">
            <Input
              type="number"
              value={model.price}
              placeholder="请输入价格"
              onChange={(val) => setModelProp('price', val)}
            />
          </Form.FormItem>
          <Form.FormItem name="category">
            <Input
              value={model.category}
              placeholder="请输入类别"
              onChange={(val) => setModelProp('category', val)}
            />
          </Form.FormItem>
          <Form.FormItem name="description">
            <Textarea
              value={model.description}
              placeholder="请输入描述"
              onChange={(val) => setModelProp('description', val)}
            />
          </Form.FormItem>
        </Form>
      </Dialog>

    </Layout>
  )
}

export default App
