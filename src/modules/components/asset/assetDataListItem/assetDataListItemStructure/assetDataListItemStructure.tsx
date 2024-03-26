import classNames from 'classnames';
import type React from 'react';
import { useMemo } from 'react';
import { Avatar, DataList, NumberFormat, Tag, formatterUtils, type IDataListItemProps } from '../../../../../core';

export interface IAssetDataListItemStructureProps extends IDataListItemProps {
    /**
     * The logo source of the asset
     */
    logoSrc?: string;
    /**
     * The name of the asset.
     */
    name?: string;
    /**
     * The symbol of the asset.
     */
    symbol?: string;
    /**
     * The amount of the asset.
     */
    amount?: number | string;
    /**
     * The fiat price of the asset.
     */
    fiatPrice?: number | string;
    /**
     * the price change in percentage of the asset (E.g. in last 24h).
     */
    priceChange?: number;
}

export const AssetDataListItemStructure: React.FC<IAssetDataListItemStructureProps> = (props) => {
    const { logoSrc, name = '-', amount = 0, symbol, fiatPrice = 0, priceChange = 0, ...otherProps } = props;

    const usdAmountChanged = useMemo(() => {
        const usdAmount = (amount ? Number(amount) : 0) * (fiatPrice ? Number(fiatPrice) : 0);
        const oldUsdAmount = (100 / (priceChange + 100)) * usdAmount;
        return usdAmount - oldUsdAmount;
    }, [amount, fiatPrice, priceChange]);

    const sign = (value: number) => (value > 0 ? '+' : value < 0 ? '-' : '');

    const changedAmountClasses = classNames(
        'text-sm font-normal leading-tight md:text-base',
        { 'text-success-800': usdAmountChanged > 0 },
        { 'text-neutral-500': usdAmountChanged === 0 },
        { 'text-critical-800': usdAmountChanged < 0 },
    );

    return (
        <DataList.Item {...otherProps}>
            <div className="flex gap-x-3 py-0 md:py-1.5">
                <Avatar src={logoSrc} size="md" />
                <div className=" flex w-full justify-between">
                    <div className="flex flex-col gap-y-0.5">
                        <span className="truncate text-sm leading-tight text-neutral-800 md:text-base">{name}</span>
                        <p className="text-sm leading-tight text-neutral-500 md:text-base">
                            <span>
                                {formatterUtils.formatNumber(amount, {
                                    format: NumberFormat.TOKEN_AMOUNT_SHORT,
                                    fallback: '',
                                })}{' '}
                            </span>
                            <span className="truncate">{symbol}</span>
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-y-0.5">
                        <span className="text-sm leading-tight text-neutral-800 md:text-base">
                            {formatterUtils.formatNumber(
                                (amount ? Number(amount) : 0) * (fiatPrice ? Number(fiatPrice) : 0),
                                {
                                    format: NumberFormat.FIAT_TOTAL_SHORT,
                                    fallback: '-',
                                },
                            )}
                        </span>
                        <div className="flex items-center gap-x-1">
                            <span className={changedAmountClasses}>
                                {sign(usdAmountChanged)}
                                {formatterUtils.formatNumber(Math.abs(usdAmountChanged), {
                                    format: NumberFormat.FIAT_TOTAL_SHORT,
                                })}
                            </span>
                            <Tag
                                label={`${sign(priceChange / 100)}${formatterUtils.formatNumber(
                                    Math.abs(priceChange / 100),
                                    {
                                        format: NumberFormat.PERCENTAGE_SHORT,
                                    },
                                )}`}
                                variant={priceChange > 0 ? 'success' : priceChange < 0 ? 'critical' : 'neutral'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </DataList.Item>
    );
};
