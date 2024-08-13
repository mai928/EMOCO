'use client'
import React, { useEffect, useState } from 'react'
import { fetchData } from '../../utils/api';
import { useTranslation } from 'react-i18next';

const Form = () => {
    const { t, i18n } = useTranslation()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [responseMessage, setResponseMessage] = useState('');

    const ResponseMessage = ({ message }) => {
        if (!message) return null;

        return (
            <div className="mt-6 text-center">
                <p className={`text-lg ${message === 'Message sent successfully!' ? 'text-green-900' : 'text-red-500'}`}>
                    {message}
                </p>
            </div>
        );
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Accept-Language", i18n.language);
        myHeaders.append("Cookie", "laravel_session=NCqzcvKaxeukpVnKGazFEy1Ig1lbjc99Y0JdjOTT");


        try {
            const response = await fetch('http://admin.emocoegypt.com/admin/public/api/contact-submit', {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log(result.data)

            if (response.status) {
                setResponseMessage('Message sent successfully!');
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: '',
                });
            } else {
                console.error('Failed to send message. Please try again.');

                setResponseMessage('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setResponseMessage('An error occurred. Please try again.');
        }

        setTimeout(() => {
            setResponseMessage('')
        }, 3000)


    };


    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchDataFromAPI = async () => {
            try {
                const result = await fetchData('api/contact-submit');
                // setData(result?.data[0]);
                console.log('result::', result)
            } catch (error) {
                console.error("Error fetching data:", error);
                // setError(error);
            }
        };

        fetchDataFromAPI();
    }, []);

    return (
        <form onSubmit={handleSubmit} className=' w-full lg:w-2/3 pb-10 lg:pb-0 '>
            <div className='text-center'>
                <p className='text-slate-500  font-semibold'><span className='text-secondary_color text-2xl '>CONTACT</span> US</p>
                <p className='text-gray-500 text-sm my-1'>If you have question , feel free to get in touch</p>
                <div className='flex items-center justify-center mt-3'>
                    <div className='border-[1px] border-solid border-gray-500 w-96' />
                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} className='fill-gray-400 ' viewBox="0 0 320 512"><path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l256 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" /></svg>
                    <div className='border-[1px] border-solid border-gray-500 w-96' />

                </div>

            </div>
            <div className=' block lg:flex gap-10 my-5'>
                <input className='bg-white py-2  rounded-lg outline-none border-[1px] border-solid border-gray-400 w-full px-3' type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required placeholder='Name' />

                <input className='bg-white py-2  rounded-lg outline-none border-[1px] border-solid border-gray-400 w-full mt-7 lg:mt-0 px-3' type='number'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required placeholder='Phone' />

            </div>


            <input className='bg-white py-2  rounded-lg outline-none border-[1px] border-solid border-gray-400 my-3 w-full px-3' type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required placeholder='Email' />
            <div className='py-5'>
                <textarea id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required cols={30} className='bg-white py-2  rounded-lg outline-none border-[1px] border-solid border-gray-400 w-full px-3' placeholder='Message' />


            </div>
            <div className='text-center lg:text-end mt-4'>
                <button type='submit' className='cursor-pointer border-[1px] rounded-lg border-solid   bg-secondary_color hover:bg-slate-700  text-white py-2 px-20 '>SEND</button>

            </div>

            <div>
                <ResponseMessage message={responseMessage} />
            </div>
        </form>)
}

export default Form