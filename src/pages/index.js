import { Skeleton } from 'primereact/skeleton';
import React, { useContext, useEffect, useState } from 'react';
import { LayoutContext } from '../layout/context/layoutcontext';

import Layout from '@/layout/layout';
import usepost from './api/blog';
import { TrimWords } from '@/lib/trimWordEllipsis';
import { Dialog } from 'primereact/dialog';

const Dashboard = (props) => {
    const [lineOptions, setLineOptions] = useState(null);
    const { layoutConfig } = useContext(LayoutContext);

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        setLineOptions(lineOptions);
    };
    const { GetAllPostAPI, GetPostAPI } = usepost();
    const [visible, setVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postSpesific, setPostSpesific] = useState([]);

    useEffect(() => {
        const GetPosts = async () => {
            let getAllUser = await GetAllPostAPI();
            setPosts(getAllUser);
        }
        GetPosts();
    }, []);

    const GetSpesificPost = async (id) => {
        setVisible(true);
        let getPost = await GetPostAPI(id);
        setPostSpesific(getPost);
    }

    useEffect(() => {
        if (layoutConfig.colorScheme === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [layoutConfig.colorScheme]);


    return (
        <Layout user={props.user}>
            <div className="grid">
                {posts.map((data, index) => (
                    <div key={index} className="col-12 lg:col-6 xl:col-3">
                        <div className="card mb-0 cursor-pointer" onClick={(e) => {
                            e.preventDefault();
                            GetSpesificPost(data.id);
                        }}>
                            <div className="flex justify-content-between mb-3">
                                <div>
                                    <div className="text-900 font-medium text-xl mb-3 text-center">{data.title}</div>
                                    <span className="block text-500 font-medium">{TrimWords(data.body, 165)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Dialog
                header={
                    postSpesific.data
                        ?
                        <>{postSpesific.data.title}</>
                        :
                        <Skeleton></Skeleton>
                }
                visible={visible}
                onHide={() => {
                    setVisible(false)
                    setPostSpesific([]);
                }
                }
                style={{ width: '50vw' }}
                breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            >
                {
                    postSpesific.data
                        ?
                        <p className="m-0">{postSpesific.data.body}</p>
                        :
                        <Skeleton className="m-0"></Skeleton>
                }
                {
                    postSpesific.comments
                        ?
                        <>
                            <p className='text-900 font-medium my-2'>Comments :</p>
                            {

                                postSpesific.comments.length > 0 ? postSpesific.comments.map((data, index) => (
                                    <React.Fragment key={index}>
                                        <p className="m-0">{data.body}</p>
                                        <p className="m-0 text-500 mb-2">By {data.name}</p>
                                    </React.Fragment>
                                ))
                                :
                                <p className="m-0">No Comment</p>
                            }
                        </>
                        :
                        <Skeleton className="mt-2"></Skeleton>
                }
            </Dialog>
        </Layout>
    );
};

export default Dashboard;
