"use client"

import * as React from "react"
import { Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface StatusFilterProps {
    selectedStatus: string[]
    onFilterChange: (statuses: string[]) => void
    allStatuses?: string[] // Prop pour recevoir la liste des statuts
}

export function StatusFilter({
    selectedStatus,
    onFilterChange,
    allStatuses = [
        "Terminé",
        "En cours",
        "En maintenance",
        "Planifié",
        "Abandonné"
    ] // Valeurs par défaut qui peuvent être remplacées
}: StatusFilterProps) {
    // Fonction pour obtenir la classe de couleur en fonction du statut
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'en cours':
                return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
            case 'terminé':
                return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
            case 'en maintenance':
                return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20';
            case 'planifié':
                return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
            case 'abandonné':
                return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
            default:
                return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Clock className="mr-2 h-4 w-4" />
                        Filter Status
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuLabel>Statut</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {allStatuses.map((status) => (
                        <DropdownMenuCheckboxItem
                            key={status}
                            checked={selectedStatus.includes(status)}
                            onCheckedChange={(checked) => {
                                onFilterChange(
                                    checked
                                        ? [...selectedStatus, status]
                                        : selectedStatus.filter((s) => s !== status)
                                )
                            }}
                        >
                            {status}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {selectedStatus.length > 0 && (
                <>
                    {selectedStatus.map((status) => (
                        <Badge
                            key={status}
                            variant="secondary"
                            className={`gap-1 px-3 py-1 ${getStatusColor(status)}`}
                        >
                            {status}
                            <button
                                onClick={() => onFilterChange(selectedStatus.filter(s => s !== status))}
                                className="ml-1 rounded-full hover:bg-secondary/30"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onFilterChange([])}
                        className="h-7 px-3 text-sm"
                    >
                        Clear all
                    </Button>
                </>
            )}
        </div>
    )
}