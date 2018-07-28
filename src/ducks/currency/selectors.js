export const getIsBtcLoading = state => state.currency.isBtcLoading;
export const getIsEthLoading = state => state.currency.isEthLoading;
export const getOffset = state => state.currency.offset;
export const getSelected = state => state.currency.selected;
export const getEth = state => state.currency.eth;
export const getBtc = state => state.currency.bth;
export const getTradeCurrencyError = state => state.currency.tradeCurrencyError;
export const getSell = state => {
  if (state.currency.selected === 'btc') {
    return state.currency.btc.map(item => {
      return {
        date: item.mts,
        value: item.sell
      };
    });
  }

  if (state.currency.selected === 'eth') {
    return state.currency.eth.map(item => {
      return {
        date: item.mts,
        value: item.sell
      };
    });
  }

  return [];
};
export const getPurchase = state => {
  if (state.currency.selected === 'btc') {
    return state.currency.btc.map(item => {
      return {
        date: item.mts,
        value: item.purchase
      };
    });
  }

  if (state.currency.selected === 'eth') {
    return state.currency.eth.map(item => {
      return {
        date: item.mts,
        value: item.purchase
      };
    });
  }

  return [];
};
export const getCurrentBtcPurchase = state => {
  if (!state.currency.btc.length) {
    return 0;
  }
  return state.currency.btc[0].purchase;
};
export const getCurrentEthPurchase = state => {
  if (!state.currency.eth.length) {
    return 0;
  }
  return state.currency.eth[0].purchase;
};
export const getCurrentCurrencyPurchase = state => {
  if (!state.currency.btc.length || !state.currency.eth.length) {
    return 0;
  }
  return state.currency.selected === 'btc' ? state.currency.btc[0].purchase : state.currency.eth[0].purchase;
};
export const getCurrentCurrencySell = state => {
  if (!state.currency.btc.length || !state.currency.eth.length) {
    return 0;
  }
  return state.currency.selected === 'btc' ? state.currency.btc[0].sell : state.currency.eth[0].sell;
};
