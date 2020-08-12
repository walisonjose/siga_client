import {
    SOLICITATIONS_CHANGE_PROPS,
    SOLICITATIONS_NEW_RESET_CHANGE
} from '../actions/Types';
import moment from 'moment'

const INITIAL_STATE = {
    isFetchingSolicitations: false,
    newSolicitations: [],
    historySolicitations: [],
    newSolicitation: {
        order: null,
        status: 'waiting_send',
        patient_name: '',
        patient_sexo: null,
        patient_dia_nascimento: null,
        patient_mes_nascimento: null,
        patient_ano_nascimento: null,
        patient_leito: null,
        patient_peso: null,
        patient_prontuario: null,

        tipo_transfusao: null,
        tipo_transfusao_programada_day: moment().format('DD'),
        tipo_transfusao_programada_month: moment().format('MM'),
        tipo_transfusao_programada_year:  moment().format('YYYY'),
        tipo_transfusao_programada_hour: moment().format('HH'),
        tipo_transfusao_programada_minute: moment().format('mm'),

        tem_hemocomponente_concentrado_hemacia: false,
        qtd_hemocomponente_concentrado_hemacia: '',
        hemocomponente_concentrado_hemacia_hb: '',
        hemocomponente_concentrado_hemacia_ht: '',
        hemocomponente_concentrado_hemacia_hemacia_lavada: '',
        hemocomponente_concentrado_hemacia_irradiado: false,
        hemocomponente_concentrado_filtro_leucocito: false,

        tem_hemocomponente_plasma_fresco: false,
        qtd_hemocomponente_plasma_fresco: '',

        tem_hemocomponente_concentrado_plaquetas: false,
        qtd_hemocomponente_concentrado_plaquetas: '',
        hemocomponente_plq: '',
        plaquetas_aferese: '',

        tem_hemocomponente_crioprecipitado: false,
        qtd_hemocomponente_crioprecipitado: '',

        tem_hemocomponente_complexo_protrombinico: false,
        qtd_hemocomponente_complexo_protrombinico: '',

        tem_hemocomponente_concentrado_fator_viii: false,
        qtd_hemocomponente_concentrado_fator_viii: '',

        tem_hemocomponente_concentrado_hemacias_lavadas: false,
        qtd_hemocomponente_concentrado_hemacias_lavadas: '',

        tem_hemocomponente_concentrado_plaquetas_aferese: false,
        qtd_hemocomponente_concentrado_plaquetas_aferese: '',

        pe_tem_phet: false,
        pe_tem_plasmaferese_terapeutica: false,
        pe_tem_citaferese_terapeutica: false,
        pe_tem_sangria_terapeutica: false,
        pe_tem_outros: false,
        pe_descricao_outros: null,

        indicacao_clinica: null,
        indicacao_clinica_paciente_oncologico: false,
        indicacao_clinica_gestante: false,
        indicacao_antecedente_transfucional: false,
        indicacao_reacao_transfucional: false,
        indicacao_procedimentos_especiais: false,
        id_doctor: null,
        id_hospital: null
    },
    viewNewSolicitation: null,
    viewHistorySolicitation: null,
    hospitalPrincipal: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SOLICITATIONS_CHANGE_PROPS:
            return { ...state, ...action.payload };

        case SOLICITATIONS_NEW_RESET_CHANGE:
         //   return { ...state, ...{newSolicitation: state.newSolicitation} };
         return { ...state, ...{newSolicitation: {}} };
        default:
            return state;
    }
};
