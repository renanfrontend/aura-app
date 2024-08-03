import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ToastAndroid, FlatList } from 'react-native';
import {
    Container,
    ContainerReservations,
    ButtonReserve,
    ButtonText,
    AreaDescription,
    ServiceName,
    Price,
    Hour,
    Date,
} from './styles';
import { ReservationsProps } from '../../@types/reservations';
import { UserInfo } from '../Dashboard/index';
import { api } from '../../services/api';
import { formatPrice, dateFormat } from '../../util/format';
import { FontAwesome, Octicons, Entypo } from '@expo/vector-icons';
import Loading from '../../components/Loading';

export default function MyReservations() {
    const [userInfo, setUserInfor] = useState<UserInfo>();
    const [loading, setLoading] = useState(false);
    const [myReservations, setMyReservations] = useState<ReservationsProps[] | []>([]);

    useEffect(() => {
        async function loadUser() {
            const response = await api.get('/userinfo');

            setUserInfor(response.data);
        }

        loadUser();
    }, []);

    useEffect(() => {
        loadReservations();
    }, []);

    async function loadReservations() {
        setLoading(true);
        const response = await api.get('/reserve/detail/user', {
            params: { user_id: userInfo?.id },
        });

        setMyReservations(response.data);
        setLoading(false);
    }

    function handleCancelReservation(reserve_id: string) {
        const currentReservation = myReservations.find((reserve) => reserve.id === reserve_id);

        if (currentReservation?.status) {
            ToastAndroid.showWithGravity(
                'Reserva finalizada pelo o gestor do App!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );

            return;
        }

        Alert.alert('Minhas reservas', 'Deseja realmente cancelar esta reserva?', [
            {
                text: 'SIM',
                onPress: async () => {
                    setLoading(true);
                    try {
                        const response = await api.delete('/reserve', {
                            params: { reserve_id: reserve_id },
                        });

                        loadReservations();

                        ToastAndroid.showWithGravity(
                            'Reserva cancelada com sucesso!',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                    } catch (err) {
                        console.log('erro ao cancelar reserva', err);

                        ToastAndroid.showWithGravity(
                            'Erro ao cancelar reserva',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM
                        );
                    }
                },
            },
            {
                text: 'NÂO',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            {myReservations.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Sem reservas cadastradas 🙁</Text>
                </View>
            ) : loading ? (
                <Loading />
            ) : (
                <FlatList
                    data={myReservations}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ContainerReservations>
                            <AreaDescription>
                                <ServiceName>{item.services.name}</ServiceName>
                                <View style={styles.descriptionBlock}>
                                    <FontAwesome name="calendar-check-o" size={15} color="black" />
                                    <Date>{dateFormat(item.date)}</Date>
                                </View>
                                <View style={styles.descriptionBlock}>
                                    <Octicons name="stopwatch" size={15} color="black" />
                                    <Hour>{item.hour}h</Hour>
                                </View>
                                <View style={styles.descriptionBlock}>
                                    <Entypo name="price-tag" size={15} color="black" />
                                    <Price>{formatPrice(parseFloat(item.services.price))}</Price>
                                </View>
                            </AreaDescription>
                            <ButtonReserve
                                onPress={() => handleCancelReservation(item.id)}
                                disabled={item.status}
                                isFinalized={item.status}
                            >
                                <ButtonText>
                                    {item.status ? 'Finalizada' : 'Cancelar Reserva'}
                                </ButtonText>
                            </ButtonReserve>
                        </ContainerReservations>
                    )}
                />
            )}
        </Container>
    );
}

const styles = StyleSheet.create({
    descriptionBlock: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
