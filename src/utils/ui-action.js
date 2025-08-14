import { Modal, Button } from 'antd';

const { confirm } = Modal;

export function confirmAction  ({content, onOk, onCancel}) {
    confirm({
        title: 'Are you sure?',
        content: content,
        okText: 'Yes',
        okType: 'primary',
        cancelText: 'Cancel',
        onOk() {
            onOk()
        }
    });
}
