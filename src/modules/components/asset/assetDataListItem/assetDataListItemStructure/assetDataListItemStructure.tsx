import classNames from 'classnames';
import type React from 'react';
import { Avatar, DataList, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';

export interface IAssetDataListItemStructureProps extends IDataListItemProps {
    /**
     * The source of the logo for the token.
     */
    logoSrc?: string;
    /**
     * The name of the Token.
     */
    tokenName?: string;
    /**
     * The symbol of the Token.
     */
    symbol?: string;
    /**
     * The amount of the Token.
     */
    amount?: number | string;
    /**
     * The price of the Token.
     */
    USDAmount?: number | string;
    /**
     * changed price amount (E.g. in last 24h).
     */
    changedAmount?: number | string;
    /**
     * changed price amount ratio (E.g. in last 24h).
     */
    changedPercentage?: number | string;
}

export const AssetDataListItemStructure: React.FC<IAssetDataListItemStructureProps> = (props) => {
    const { logoSrc, tokenName, amount, symbol, USDAmount, changedAmount, changedPercentage, ...otherProps } = props;

    const formattedChangedAmount = Number(Number(changedAmount).toFixed(2));
    const formattedChangedPercentage = Number(Number(changedPercentage).toFixed(2));

    const sign = (value: number) => (value > 0 ? '+' : value < 0 ? '-' : '');
    const changedAmountSign = sign(formattedChangedAmount);
    const changedPercentageSign = sign(formattedChangedPercentage);

    const changedAmountClasses = classNames(
        'text-sm font-normal leading-tight md:text-base',
        { 'text-success-800': formattedChangedAmount > 0 },
        { 'text-neutral-500': formattedChangedAmount === 0 },
        { 'text-critical-800': formattedChangedAmount < 0 },
    );

    return (
        <DataList.Item {...otherProps}>
            <div className="flex space-x-3 py-0 md:py-1.5">
                <Avatar {...{ src: logoSrc }} size="md" />
                <div className=" flex w-full justify-between">
                    <div className="flex flex-col space-y-0.5">
                        <span className="text-sm leading-tight text-neutral-800 md:text-base">{tokenName}</span>
                        <p className="text-sm leading-tight text-neutral-500 md:text-base">
                            <span>
                                {formatterUtils.formatNumber(amount, {
                                    format: NumberFormat.TOKEN_AMOUNT_SHORT,
                                    fallback: '',
                                })}{' '}
                            </span>
                            <span>{symbol}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end space-y-0.5">
                        <span className="text-sm leading-tight text-neutral-800 md:text-base">
                            {formatterUtils.formatNumber(USDAmount, {
                                format: NumberFormat.FIAT_TOTAL_SHORT,
                                fallback: '-',
                            })}
                        </span>
                        <div className="flex items-center space-x-1">
                            <span className={changedAmountClasses}>
                                {changedAmountSign}
                                {formatterUtils.formatNumber(Math.abs(formattedChangedAmount || 0), {
                                    format: NumberFormat.FIAT_TOTAL_SHORT,
                                })}
                            </span>
                            <Tag
                                label={`${changedPercentageSign} ${formatterUtils.formatNumber(
                                    Math.abs(formattedChangedPercentage || 0),
                                    {
                                        format: NumberFormat.PERCENTAGE_SHORT,
                                    },
                                )}`}
                                variant={
                                    formattedChangedPercentage > 0
                                        ? 'success'
                                        : formattedChangedPercentage < 0
                                          ? 'critical'
                                          : 'neutral'
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
