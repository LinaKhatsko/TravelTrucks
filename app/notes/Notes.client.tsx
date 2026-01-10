"use client";

import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import css from "./NotesPage.module.css";
import { Toaster } from "react-hot-toast";

const NotesClient = () => {
    const [page, setPage] = useState<number>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [debouncedQuery] = useDebounce(searchQuery, 500);

    useEffect(() => {
        setPage(1);
    }, [debouncedQuery]);

    const { data: notesData } = useQuery({
        queryKey: ["notes", page, debouncedQuery],
        queryFn: () => fetchNotes({ page, query: debouncedQuery }),
        placeholderData: keepPreviousData,
    });

    const handlePageClick = (event: { selected: number }): void => {
        setPage(event.selected + 1);
    };

 

    const handleCreated = () => toast.success("Note created successfully!");
    const handleDeleted = () => toast.success("Note deleted successfully!");

    return (
        <div className={css.app}>
            <Toaster position="top-right" />
            <header className={css.toolbar}>
                <SearchBox value={searchQuery} onChange={setSearchQuery} />
                {notesData && notesData.totalPages > 1 && (
                    <Pagination
                        pageCount={notesData.totalPages}
                        currentPage={page}
                        onPageChange={handlePageClick}
                    />
                )}
            </header>
            <main>
                {notesData && notesData.notes.length > 0 && (
                    <NoteList
                        notes={notesData.notes}
                        onDeleted={handleDeleted}
                    />
                )}
            </main>
        </div>
    );
};

export default NotesClient;