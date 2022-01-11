import React from "react";
import Modal from "../components/Modal";

export default {
    component: Modal,
    title: 'Components/Modal',
    parameters: {
        storyshots: { disable: true },
    },
};

export const basic = () => <Modal title={'Basic Modal'} visible={true}>Modal Content</Modal>

export const NoCloseable = () => <Modal title={'No Closeable'} visible={true} closable={false}>Modal Content</Modal>