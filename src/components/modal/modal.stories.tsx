import { type Meta, type Story } from '@storybook/react';
import React, { type ReactNode } from 'react';
import { Modal, type ModalProps } from './modal';

export default {
    title: 'Components/Modal',
    component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

const TestContent: ReactNode = (
    <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
        repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga
        praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure
        eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt
        quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error
        repudiandae fuga?
    </div>
);

export const Default = Template.bind({});
Default.args = {
    children: TestContent,
    title: 'Test Modal',
    subtitle: 'Subtitle',
};
