import type { Meta, StoryObj } from '@storybook/react';
import { AssetTransfer } from '../../../modules';
import { Card } from '../cards';
import { Heading } from '../heading';
import { Icon, IconType } from '../icon';
import { IllustrationHuman } from '../illustrations';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
    title: 'Core/Components/Accordion',
    component: Accordion,
    tags: ['autodocs'],
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/file/ISSDryshtEpB7SUSdNqAcw/branch/P0GeJKqILL7UXvaqu5Jj7V/Aragon-ODS?type=design&node-id=15855%3A28278&mode=design&t=ssVJeaQ2V7PqQVNj-1',
        },
    },
};

type Story = StoryObj<typeof Accordion>;

/**
 * Default usage example of Accordion component.
 */
export const Default: Story = {
    args: {
        items: [
            {
                itemHeader: 'Item 1',
                itemContent:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu tellus a massa lobortis facilisis. Etiam arcu mauris, pharetra eget ornare sit amet, faucibus ac nunc. Suspendisse eget leo molestie, lacinia erat sit amet, mattis libero. Maecenas justo leo, rhoncus a consectetur a, elementum et libero. Donec eu leo magna. Quisque id ante purus. Nam tincidunt lectus non orci rhoncus tempus. Sed elementum rhoncus libero ac eleifend. Aenean in viverra nunc. Nunc auctor felis nec scelerisque tincidunt. Phasellus sit amet metus sed enim varius cursus accumsan eget magna. Aenean feugiat non libero sed sollicitudin. Vivamus varius vestibulum diam, vitae maximus lacus. Nunc bibendum turpis quis tellus interdum hendrerit. Donec eget purus vitae mauris facilisis elementum. Aenean fringilla egestas velit eget lobortis.',
            },
            {
                itemHeader: 'Item 2',
                itemContent:
                    'Sed ut tortor tempor, fermentum ipsum eu, pulvinar ex. Nullam vitae magna ligula. Sed nec massa magna. Nulla hendrerit turpis purus, in tempus nulla dapibus quis. Quisque tellus est, posuere sed ipsum ut, dictum sollicitudin massa. In sodales tortor in eros sollicitudin, quis mattis ante accumsan. Cras quis diam vitae arcu pulvinar maximus. Praesent ac eros convallis, aliquet enim at, euismod ipsum. Nam blandit dictum urna, non feugiat ante porttitor quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse gravida velit non libero gravida, in ornare arcu consectetur. Cras rhoncus elementum condimentum. Pellentesque dignissim pulvinar bibendum. Praesent ac quam quis enim rhoncus aliquet.',
            },
        ],
    },
};

/**
 * Example usage with the accordion inside a Card filled different types of content.
 */
export const WithCardAndTitle: Story = {
    args: {
        items: [
            {
                itemHeader: 'Item 1',
                itemContent: (
                    <div className="flex justify-between">
                        <Icon size="lg" icon={IconType.APP_DASHBOARD} />
                        <Icon size="lg" icon={IconType.APP_MEMBERS} />
                        <Icon size="lg" icon={IconType.APP_PROPOSALS} />
                        <Icon size="lg" icon={IconType.APP_DASHBOARD} />
                        <Icon size="lg" icon={IconType.APP_MEMBERS} />
                        <Icon size="lg" icon={IconType.APP_PROPOSALS} />
                        <Icon size="lg" icon={IconType.APP_DASHBOARD} />
                        <Icon size="lg" icon={IconType.APP_MEMBERS} />
                        <Icon size="lg" icon={IconType.APP_PROPOSALS} />
                    </div>
                ),
            },
            {
                itemHeader: 'Item 2',
                itemContent: (
                    <AssetTransfer
                        sender={{ address: '0x1D03D98c0aac1f83860cec5156116FE68725642E' }}
                        recipient={{ address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' }}
                        assetName="Ethereum"
                        assetAmount={0.1}
                        assetSymbol="ETH"
                        assetFiatPrice={3000}
                        assetIconSrc="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
                        hash="0x1D03D98c0aac1f83860cec5156116FE68725642E"
                    />
                ),
            },
            {
                itemHeader: 'Item 3',
                itemContent: <IllustrationHuman body="SENDING_LOVE" expression="ANGRY" />,
            },
        ],
    },

    render: (args) => (
        <Card className="overflow-hidden">
            <div className="flex flex-col gap-y-3 px-4 py-3 text-neutral-700 md:gap-y-5 md:px-6 md:py-5">
                <Heading size="h2">Accordion in a Card + Title</Heading>
                <p>
                    Example usage where we have put the accordion inside a {`<Card />`} and added a title and
                    description to the card. Below you&apos;ll see that the content section of each Accordion Item can
                    accept any React Node.
                </p>
            </div>
            <Accordion {...args} />
        </Card>
    ),
};

export default meta;
