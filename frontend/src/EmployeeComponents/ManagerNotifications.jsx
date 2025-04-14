import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(2);
    const [addHolidayData, setAddHolidayData] = useState({ employeeId: '', daysToAdd: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchNotifications = async () => {
            const managerId = localStorage.getItem('employeeId');
            try {
                const response = await axios.get('http://localhost:5090/api/Manager/Get-messages', {
                    params: { managerId },
                });
                // Reverse to show latest notifications on top
                setNotifications(response.data.reverse());
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const lastRow = currentPage * rowsPerPage;
    const firstRow = lastRow - rowsPerPage;
    const currentNotifications = notifications.slice(firstRow, lastRow);
    const totalPages = Math.ceil(notifications.length / rowsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleResolve = async (messageId, employeeId) => {
        try {
            await axios.put('http://localhost:5090/api/Manager/update-status', {
                messageId,
                status: 'Resolved',
            });
            setMessage(`Notification for employee ${employeeId} resolved successfully.`);
            setNotifications((prev) =>
                prev.map((notification) =>
                    notification.messageId === messageId
                        ? { ...notification, status: 'Resolved' }
                        : notification
                )
            );
        } catch (error) {
            console.error('Error resolving notification:', error);
            setMessage('Failed to resolve notification. Please try again.');
        }
    };

    const handleAddHoliday = async () => {
        const managerId = localStorage.getItem('employeeId');
        try {
            await axios.post('http://localhost:5090/api/Manager/manager/add-holiday', {
                managerId: parseInt(managerId),
                employeeId: parseInt(addHolidayData.employeeId),
                daysToAdd: parseInt(addHolidayData.daysToAdd),
            });
            setMessage(`Successfully added ${addHolidayData.daysToAdd} days to employee ${addHolidayData.employeeId}.`);
            setAddHolidayData({ employeeId: '', daysToAdd: '' });
        } catch (error) {
            console.error('Error adding holiday:', error);
            setMessage('Failed to add holiday. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center mt-10 text-xl font-bold">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">Manager Notifications</h1>
            {message && <div className="bg-green-100 text-green-700 p-2 rounded mb-4">{message}</div>}
            
            <ul className="space-y-4">
                {currentNotifications.map((notification) => (
                    <li key={notification.messageId} className="border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm">
                        <p className="text-lg font-semibold text-blue-700">
                            Employee: {notification.employeeFullName} (ID: {notification.employeeId})
                        </p>
                        <p className="text-gray-700 mt-2">{notification.message}</p>
                        <p className="text-gray-500 mt-2">
                            Status: <span className="font-semibold">{notification.status}</span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Received at: {new Date(notification.timeStamp).toLocaleString()}
                        </p>
                        {notification.status !== 'Resolved' && (
                            <button
                                onClick={() => handleResolve(notification.messageId, notification.employeeId)}
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Resolve
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Add Holiday Section */}
            <div className="mt-10 border-t pt-6">
                <h3 className="text-lg font-semibold mb-2">Add Holiday to Employee</h3>
                <div className="flex gap-4 flex-wrap">
                    <input
                        type="number"
                        placeholder="Employee ID"
                        value={addHolidayData.employeeId}
                        onChange={(e) =>
                            setAddHolidayData({ ...addHolidayData, employeeId: e.target.value })
                        }
                        className="border px-3 py-2 rounded w-40"
                    />
                    <input
                        type="number"
                        placeholder="Days to Add"
                        value={addHolidayData.daysToAdd}
                        onChange={(e) =>
                            setAddHolidayData({ ...addHolidayData, daysToAdd: e.target.value })
                        }
                        className="border px-3 py-2 rounded w-40"
                    />
                    <button
                        onClick={handleAddHoliday}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Holiday
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagerNotifications;
