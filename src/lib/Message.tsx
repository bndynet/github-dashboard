import { toast } from 'react-toastify';

const MessageCloseButton = () => (
    <span className='btn-close' role='button' aria-label='Close Toaster'>&times;</span>
);

const MessageBody = ({ data }) => (
    data.content ? (
        <div>
            <div className='title'>{data.title}</div>
            <p>{data.content}</p>
        </div>
    ) : (
        <div>{data.title}</div>
    )
);

const messageOption = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 80,
    closeButton: <MessageCloseButton></MessageCloseButton>,
};

export const message = {
    info: (title: string, content?: string) => toast.info(<MessageBody data={{ title, content }} />, messageOption),
    warn: (title: string, content?: string) => toast.warn(<MessageBody data={{ title, content }} />, messageOption),
    error: (title: string, content?: string) => toast.error(<MessageBody data={{ title, content }} />, messageOption),
    success: (title: string, content?: string) => toast.success(<MessageBody data={{ title, content }} />, messageOption),
};
