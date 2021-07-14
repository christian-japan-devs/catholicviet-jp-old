
import React from 'react';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
// Shared componentss

import { Ticket, TicketCard } from '../../components/Card/TicketCard';
//Utils
import { apiDomain, massRegisterURL } from '../../utils/apiEndpoint';
import { toDate, getHeaderWithAuthentication, cancelRegistration } from '../../utils/utils';

export const RegisterHistoryTab = () => {
    let initTicket: Ticket[] = [];

    const [tickets, setTickets] = React.useState(initTicket);

    React.useEffect(() => {

        let headers = getHeaderWithAuthentication();
        fetch(massRegisterURL, {
            method: 'get',
            headers: headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw res;
            })
            .then((res) => {
                for (let index in res) {
                    let data = res[index];
                    let ticket: Ticket = {
                        id: data.id,
                        title: data.registration_mass.mass_title,
                        date: data.registration_date,
                        time: data.registration_mass.mass_time,
                        name: data.registration_user,
                        seat: data.registration_seat,
                        code: data.registration_confirm_code,
                        confirm: data.registration_confirm_status,
                        status: data.registration_status,
                        approve: data.registration_approve_status
                    }
                    setTickets(tickets => [...tickets, ticket]);
                }
            })
            .catch((err) => {
                console.log(err);
                //TODO: throw err notification.
            });
    }, []);

    const handleCancelRegister = (id: number, code: string) => {
        let result = cancelRegistration("mass", id, code);
        //TODO: Show cancel action result
    }

    //Load register history
    return (
        <Container component="main" maxWidth="xs">
            { tickets.map((ticket) => (
                <TicketCard ticket={ticket} handleCancelRegister={handleCancelRegister} />
            ))}
        </Container>
    );
};