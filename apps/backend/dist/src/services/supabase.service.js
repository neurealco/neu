"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get rpc () {
        return rpc;
    },
    get supabase () {
        return supabase;
    }
});
const _supabasejs = require("@supabase/supabase-js");
const _config = /*#__PURE__*/ _interop_require_default(require("../config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const supabase = (0, _supabasejs.createClient)(_config.default.SUPABASE_URL, _config.default.SUPABASE_SECRET, {
    auth: {
        autoRefreshToken: true,
        persistSession: false
    }
});
const rpc = async (fn, params)=>{
    const { data, error } = await supabase.rpc(fn, params);
    if (error) throw error;
    return data;
};
