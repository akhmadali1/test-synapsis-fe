import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';

import Layout from '@/layout/layout';

import useUser from '@/pages/api/user';
import { useRouter } from 'next/router';
import { ValidationObjectValue } from '@/lib/validationObjectValue';

export default function RowExpansionDemo(props) {
    const router = useRouter();
    let emptyUser = {
        id: null,
        name: null,
        email: null,
        gender: null,
        status: null,
    };
    const toast = useRef(null);
    const dt = useRef(null);

    const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);

    const { GetAllUserAPI, PostUserAPI, PutUserAPI, DeleteUserAPI } = useUser()


    useEffect(() => {
        const GetUsers = async () => {
            let getAllUser = await GetAllUserAPI();
            setUsers(getAllUser)
        }
        GetUsers();
    }, [router]);

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };


    const saveUser = async () => {
        setSubmitted(true);
        try {
            if (user.id) {
                const flag = ValidationObjectValue(user)
                if (!flag) throw new Error(`Fill the form correctly`);
                const updatedUserStatus = await PutUserAPI(user.id, user);
                if (updatedUserStatus === 0 || updatedUserStatus === 200 || updatedUserStatus === 201 || updatedUserStatus === 204) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                    router.replace(router.asPath);
                    setUserDialog(false);
                    setUser(emptyUser);
                    setSubmitted(false);
                } else {
                    throw new Error(`Error updating user: Status code ${updatedUserStatus}`); // Provide more context in error message
                }
            } else {
                const _user = {...user}
                _user.status = "active"
                _user.id = -1
                const flag = ValidationObjectValue(_user)
                if (!flag) throw new Error(`Fill the form correctly`);
                const newUserStatus = await PostUserAPI(_user);
                if (newUserStatus === 0 || newUserStatus === 200 || newUserStatus === 201 || newUserStatus === 204) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
                    router.replace(router.asPath);
                    setUserDialog(false);
                    setUser(emptyUser);
                    setSubmitted(false);
                } else {
                    throw new Error(`Error creating user: Status code ${newUserStatus}`); // Provide more context in error message
                }
            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: error.message || 'Error saving user', life: 3000 });
        }
    };

    const editUser = (user) => {
        setUser(user);
        setUserDialog(true);
    };

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const deleteUser = async () => {
        let deleteHeader = await DeleteUserAPI(user.id);
        setDeleteUserDialog(false);
        if (deleteHeader === 200) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            router.replace(router.asPath);
        } else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error to delete User', life: 3000 });
        }
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" severity="sucess" className="" onClick={openNew} />
            </React.Fragment>
        );
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="info" rounded className="mr-1" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" severity="danger" rounded className="mr-1" onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
    };

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
        </>
    );
    const deleteUserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUser} />
        </>
    );


    const header = (
        <>
            <Toolbar className="mb-4 flex justify-content-center sm:justify-content-start" left={leftToolbarTemplate} ></Toolbar>
            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 className="m-0">Manage User</h5>
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className='w-full sm:w-15rem' type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                </span>
            </div>
        </>
    );


    return (
        <Layout>
            <div className="card">
                <Toast ref={toast} />
                <DataTable
                    ref={dt}
                    value={users}
                    dataKey="id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    className="datatable-responsive"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    globalFilter={globalFilter}
                    emptyMessage="No users found."
                    header={header}
                >
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="email" header="Email" sortable></Column>
                    <Column field="gender" header="Gender" sortable></Column>
                    <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                </DataTable>
                <Dialog visible={userDialog} style={{ width: '450px' }} header="User Details" modal className="p-fluid" footer={userDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <InputText value={user.name} onChange={(e) => onInputChange(e, 'name')} />
                        {submitted && !user.name && <small className="p-invalid" style={{ color: 'red' }}>Name is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Email</label>
                        <InputText value={user.email} onChange={(e) => onInputChange(e, 'email')} />
                        {submitted && !user.email && <small className="p-invalid" style={{ color: 'red' }}>Email is required.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="name">Gender</label>
                        <div className="flex flex-wrap gap-3">
                            <div className="flex align-items-center">
                                <RadioButton inputId="gender1" name="gender" value="male" onChange={(e) => onInputChange(e, 'gender')} checked={user.gender === 'male'} />
                                <label htmlFor="gender1" className="ml-2">Male</label>
                            </div>
                            <div className="flex align-items-center">
                                <RadioButton inputId="gender1" name="gender" value="female" onChange={(e) => onInputChange(e, 'gender')} checked={user.gender === 'female'} />
                                <label htmlFor="gender2" className="ml-2">Female</label>
                            </div>
                        </div>
                        {submitted && !user.gender && <small className="p-invalid" style={{ color: 'red' }}>Gender is required.</small>}
                    </div>
                </Dialog>

                <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteUserDialogFooter} onHide={hideDeleteUserDialog}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {user && (
                            <span>
                                Are you sure you want to delete?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </Layout>
    );
}

