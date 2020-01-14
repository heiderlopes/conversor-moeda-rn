import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native';


import api from '../../services/api';

export default class Conversor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moedaA: props.moedaA,
            moedaB: props.moedaB,
            moedaAValor: 0,
            moedaBValor: 0
        }
        this.converter = this.converter.bind(this);
    }


    async converter() {
        let de_para = this.state.moedaA + '_' + this.state.moedaB;
        const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=7c5ef455b88d735bc6ad`);
        let cotacao = response.data[de_para];
        console.log(cotacao);
        console.log('Moeda A' + this.state.moedaAValor);
        let resultado = (cotacao * parseFloat(this.state.moedaAValor));
        console.log(resultado);
        this.setState({
            moedaBValor: resultado
        })

        Keyboard.dismiss();
    }

    render() {
        const {moedaA, moedaB} = this.props;
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>{moedaA} para {moedaB}</Text>

                <TextInput
                    placeholder="Digite o valor que será convertido"
                    style={styles.areaInput}
                    onChangeText={(moedaAValor) => this.setState({moedaAValor})}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
                    <Text style={styles.botaoTexto}>
                        Converter
                    </Text>
                </TouchableOpacity>

                <Text style={styles.valorConvertido}>
                    { (this.state.moedaBValor === 0) ? '' : this.state.moedaBValor}
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000'
    },
    areaInput: {
        width: 280,
        height: 45,
        backgroundColor: '#CCC',
        textAlign: 'center',
        marginVertical: 15,
        //fontSize: 20,
        borderRadius: 5,
        color: '#000'
    },
    botaoArea: {
        width: 150,
        height: 45,
        backgroundColor: '#FF0000',
        borderRadius:5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    botaoTexto: {
       fontSize: 15,
       color: '#FFF',
       fontWeight: 'bold' 
    },
    valorConvertido: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15
    }
});