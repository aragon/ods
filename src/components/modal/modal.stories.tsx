import { type Meta, type Story } from '@storybook/react';
import React, { type ReactNode } from 'react';
import { Modal, type ModalProps } from './modal';

export default {
    title: 'Components/Modal',
    component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args) => <Modal {...args} />;

const TestContent: ReactNode = (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
            repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
            fuga praesentium optio, eaque rerum!
        </p>
        <p>
            Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias
            architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
        </p>
        <p>Quo neque error repudiandae fuga?</p>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
            repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
            fuga praesentium optio, eaque rerum!
        </p>
        <p>
            Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias
            architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
            tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
        </p>
    </div>
);

export const Default = Template.bind({});
Default.args = {
    children: TestContent,
    title: 'Test Modal',
    subtitle: 'Subtitle',
};
