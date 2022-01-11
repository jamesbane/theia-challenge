import initStoryshots, {snapshotWithOptions} from '@storybook/addon-storyshots';
import { render } from '@testing-library/react';
import Modal from "./components/Modal";
initStoryshots({
    renderer: render,
    test: snapshotWithOptions({
        // @ts-ignore
        createNodeMock: (element) => {
            if (element.type === Modal) {
                return document.createElement('modal');
            }
        },
    }),
});