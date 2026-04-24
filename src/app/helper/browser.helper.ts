export const calculateWindowSize = (windowWidth: number) => {
    if (windowWidth >= 1200) {
        return 'lg';
    }
    if (windowWidth >= 992) {
        return 'md';
    }
    if (windowWidth >= 768) {
        return 'sm';
    }
    return 'xs';
};

export const serviceParamsFilter = (params: any, params_rule: any, output = 'object') => {
    if (output === 'object') {
        const _params: any = {};

        Object.keys(params_rule).forEach(key => {
            if (params_rule[key].hasOwnProperty('alias')) {
                const alias = params_rule[key].alias;
                if (params.hasOwnProperty(alias)) {
                    _params[key] = params[alias];
                }
            } else if (params.hasOwnProperty(key)) {
                let params_value = (params_rule[key].hasOwnProperty('encode') && params_rule[key].encode) ? encodeURI(params[key]) : params[key];

                if (params_value != '') {
                    _params[key] = params_value;
                }
            } else {
                if (params_rule[key].default != undefined && params_rule[key].default) {
                    _params[key] = params_rule[key].default
                } else if (params_rule[key]) {
                    _params[key] = params_rule[key]
                }
            }
        });

        return _params;
    } else if (output === 'string') {
        const _params: any = [];

        Object.keys(params_rule).forEach(key => {
            if (params_rule[key].hasOwnProperty('alias')) {
                const alias = params_rule[key].alias;
                if (params.hasOwnProperty(alias)) {
                    _params.push(key + '=' + params[alias]);
                }
            } else if (params.hasOwnProperty(key)) {
                let params_value = (params_rule[key].hasOwnProperty('encode') && params_rule[key].encode) ? encodeURI(params[key]) : params[key];

                if (params_value != '') {
                    _params.push(key + '=' + params_value);
                }
            } else {
                if (params_rule[key].default != undefined && params_rule[key].default) {
                    _params.push(key + '=' + params_rule[key].default);
                } else if (params_rule[key]) {
                    _params.push(key + '=' + params_rule[key]);
                }
            }
        });

        return _params.join('&');
    }
}

export const customParamsService = (fields: any, queryParams: any) => {
    let params: any = {}
    // if (Object.keys(queryParams).length > 0) {
    fields?.map((item: any) => {
        if (queryParams?.[item?.search]) {
            // console.log("queryParams?.[item?.search]", queryParams?.[item?.search]);
            params[item?.field] = queryParams?.[item?.search]
        }
    })
    // }

    return params;
}