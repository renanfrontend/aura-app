import styled, {css} from "styled-components/native";

interface ButtonProps {
    disabled: boolean;
    selected: boolean;
    isClicked: boolean;
}

export const Container = styled.View`
   
    flex: 1;
    justify-content: space-between;
    background: ${({theme}) => theme.colors.white};
`;

export const TextHeader = styled.Text`
    text-align: center;
    margin-top: 20px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.gray400};
    font-size: 16px;

`;

export const ButtonReserve = styled.TouchableOpacity.attrs<ButtonProps>(props => ({
    disabled: props.isClicked ? true : false
}))`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60px;
    background-color: ${({theme}) => theme.colors.blue400};
`;

export const ButtonText = styled.Text`
    text-transform: uppercase;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.white};
    font-size: 16px;
`;

export const Schedule = styled.View`

    height: 130px;
    padding: 0 20px;

`;

export const ScheduleText = styled.Text`
    font-size: 16px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.gray400};
`;

export const ButtonHour = styled.TouchableOpacity<ButtonProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100px;
    height: 42px;
    ${(props) => css`background-color: ${props.selected ? '#ee4691' : '#f0f0f5'}`};
    ${(props) => css`opacity: ${props.disabled ? 0.5 : 1};`};
    border-radius: 5px;
    border: 1px solid;
    border-color: ${({theme}) => theme.colors.grayLight};
    margin-right: 10px;
`;

export const HourText = styled.Text`
    font-size: 18px;
    font-family: ${({theme}) => theme.fonts.medium};
    color: ${({theme}) => theme.colors.text};
`;

export const ListText = styled.Text`

    text-align: center;
    margin-top: 25px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.grayLight};
`;