import classNames from 'classnames';
import { DateTime } from 'luxon';
import { DateFormat, DefinitionList, formatterUtils, Heading, type ITabsContentProps, Tabs } from '../../../../../core';
import { ProposalVotingTab } from '../proposalVotingDefinitions';

export interface IProposalVotingDetailsSetting {
    /**
     * Term of the setting.
     */
    term: string;
    /**
     * Value of the setting.
     */
    value: string;
}

export interface IProposalVotingDetailsProps extends Omit<ITabsContentProps, 'value'> {
    /**
     * Governance settings displayed on the details tab.
     */
    settings?: IProposalVotingDetailsSetting[];
}

export const ProposalVotingDetails: React.FC<IProposalVotingDetailsProps> = (props) => {
    const { className, settings, ...otherProps } = props;

    const hasSettings = (settings ?? []).length > 0;

    return (
        <Tabs.Content
            value={ProposalVotingTab.DETAILS}
            className={classNames('flex flex-col gap-3', className)}
            {...otherProps}
        >
            <Heading size="h3">Voting</Heading>
            <DefinitionList.Container>
                <DefinitionList.Item term="Starts">
                    <p className="text-neutral-500">
                        {formatterUtils.formatDate(DateTime.now().plus({ days: 2 }), {
                            format: DateFormat.YEAR_MONTH_DAY_TIME,
                        })}
                    </p>
                </DefinitionList.Item>
                <DefinitionList.Item term="Expires">
                    <p className="text-neutral-500">
                        {formatterUtils.formatDate(DateTime.now().plus({ days: 5 }), {
                            format: DateFormat.YEAR_MONTH_DAY_TIME,
                        })}
                    </p>
                </DefinitionList.Item>
            </DefinitionList.Container>
            {hasSettings && (
                <>
                    <Heading size="h3">Governance settings</Heading>
                    <DefinitionList.Container>
                        {settings?.map(({ term, value }) => (
                            <DefinitionList.Item key={term} term={term}>
                                <p className="text-neutral-500">{value}</p>
                            </DefinitionList.Item>
                        ))}
                    </DefinitionList.Container>
                </>
            )}
        </Tabs.Content>
    );
};
