import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Input,
  Form,
  InputNumber,
  Select,
  Switch,
  message,
  Upload,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRequest } from "ahooks";
import { useState, useEffect, useCallback } from "react";
import { flashcardApi } from "../../utils/axios/flashcardApi";
import { exerciseTypeApi } from "../../utils/axios/exerciseTypeApi";
import { RcFile } from "antd/es/upload";
import { UploadChangeParam } from "antd/es/upload";
import { UploadFile, UploadProps } from "antd/es/upload/interface";
interface Answer {
  optionText: string;
  explanation: string;
  isCorrect: boolean;
}

interface CreateExerciseRequest {
  subTopicId: string;
  xp: number;
  question: string;
  image?: RcFile;
  videoUrl?: string;
  difficulty: string;
  exerciseTypeId: string;
  answers: Answer[];
}

interface ExerciseType {
  id: string;
  name: string;
  description: string;
}

interface IProps {
  subTopicId: string;
  handleReloadTable: () => void;
}

const CreateFlashcard = (props: IProps) => {
  const [form] = Form.useForm<CreateExerciseRequest>();
  const [open, setOpen] = useState(false);
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
  const [exerciseTypesLoading, setExerciseTypesLoading] = useState(false);
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const fetchExerciseTypes = useCallback(async () => {
    try {
      setExerciseTypesLoading(true);
      const response = await exerciseTypeApi.getExerciseTypes();
      if (response?.isSuccess) {
        const types = response.responseRequest.items || [];
        setExerciseTypes(types);
      }
    } catch (error) {
      console.error("Failed to fetch exercise types:", error);
    } finally {
      setExerciseTypesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchExerciseTypes();
    }
  }, [open, fetchExerciseTypes]);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        subTopicId: props.subTopicId,
      });
    }
  }, [open, props.subTopicId, form]);

  const difficultyOptions = [
    { label: "Easy", value: "Easy" },
    { label: "Medium", value: "Medium" },
    { label: "Hard", value: "Hard" },
  ];

  const { loading, run: postFlashcard } = useRequest(
    async (data: FormData) => {
      // Sửa thành FormData
      const response = await flashcardApi.postFlashcard(data);
      if (response.isSuccess == true) {
        form.resetFields();
        setFileList([]);
        setOpen(false);
        props.handleReloadTable();
        message.success("Exercise created successfully");
      }
    },
    {
      manual: true,
    }
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values: CreateExerciseRequest) => {
    const formData = new FormData(); // Tạo FormData object

    // Thêm các trường vào formData
    formData.append("subTopicId", values.subTopicId);
    formData.append("xp", values.xp.toString());
    formData.append("question", values.question);
    if (values.image) {
      formData.append("image", values.image);
    }
    if (values.videoUrl) {
      formData.append("videoUrl", values.videoUrl);
    }
    formData.append("difficulty", values.difficulty);
    formData.append("exerciseTypeId", values.exerciseTypeId);

    // Thêm answers vào formData
    values.answers.forEach((answer, index) => {
      formData.append(`answers[${index}].optionText`, answer.optionText);
      formData.append(`answers[${index}].explanation`, answer.explanation);
      formData.append(
        `answers[${index}].isCorrect`,
        answer.isCorrect ? "true" : "false"
      );
    });

    postFlashcard(formData);
  };

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList as RcFile[]); // Cast to RcFile[]
    form.setFieldValue("image", info.file);
  };

  const uploadProps: UploadProps = {
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file as RcFile);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
      form.setFieldValue("image", undefined);
    },
    beforeUpload: (file: RcFile) => {
      setFileList([file]);
      form.setFieldValue("image", file);
      return false;
    },
    fileList,
    onChange: handleImageChange,
  };

  return (
    <>
      <Button
        className={"bg-green-600"}
        type="primary"
        onClick={handleOpen}
        icon={<PlusOutlined />}
      >
        Create
      </Button>
      <Modal
        open={open}
        title={"Create new exercise"}
        onCancel={handleClose}
        width={800}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: "Please input the question!" }]}
          >
            <TextArea rows={2} />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              className="w-1/2"
              label="Difficulty"
              name="difficulty"
              rules={[
                { required: true, message: "Please select difficulty!" },
              ]}
            >
              <Select options={difficultyOptions} />
            </Form.Item>

            <Form.Item
              className="w-1/2"
              label="XP"
              name="xp"
              rules={[{ required: true, message: "Please input XP!" }]}
            >
              <InputNumber min={0} className="w-full" />
            </Form.Item>
          </div>

          <Form.Item
            label="Exercise Type"
            name="exerciseTypeId"
            rules={[
              { required: true, message: "Please select exercise type!" },
            ]}
          >
            <Select loading={exerciseTypesLoading}>
              {exerciseTypes.map((type) => (
                <Select.Option key={type.id} value={type.id}>
                  {type.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="subTopicId" hidden>
            <Input />
          </Form.Item>

          <Form.Item label="Image" name="image">
            <Upload {...uploadProps}>
              <Button icon={<PlusOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Video URL" name="videoUrl">
            <TextArea rows={2} />
          </Form.Item>

          <div className="border p-4 rounded-md mb-4">
            <h3 className="mb-4">Answers</h3>
            <Form.List name="answers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} className="flex gap-4 items-start mb-4">
                      <div className="flex-1">
                        <Form.Item
                          {...restField}
                          name={[name, "optionText"]}
                          rules={[
                            { required: true, message: "Missing option text" },
                          ]}
                        >
                          <TextArea placeholder="Answer option" rows={2} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "explanation"]}
                          rules={[
                            { required: true, message: "Missing explanation" },
                          ]}
                        >
                          <TextArea placeholder="Explanation" rows={2} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, "isCorrect"]}
                          valuePropName="checked"
                          initialValue={false}
                        >
                          <Switch
                            checkedChildren="Correct"
                            unCheckedChildren="Incorrect"
                          />
                        </Form.Item>
                      </div>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Answer
                  </Button>
                </>
              )}
            </Form.List>
          </div>

          <Form.Item>
            <Button
              loading={loading}
              className={"bg-green-600"}
              type="primary"
              htmlType="submit"
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateFlashcard;