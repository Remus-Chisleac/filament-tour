<?php

namespace JibayMcs\FilamentTour\Tour\Traits;

use JibayMcs\FilamentTour\Tour\Step;

trait TourEvent
{
    private ?array $dispatchOnClose = null;


    /**
     * Set the livewire event to dispatch to, when the user clicks on the next button of your step.
     *
     * @param string $name
     * @param mixed ...$params
     * @return $this
     */
    public function dispatchOnClose(string $name, ...$params): self
    {
        $this->dispatchOnClose = ['name' => $name, 'params' => $params];

        return $this;
    }

    public function getDispatchOnClose(): ?array
    {
        return $this->dispatchOnClose;
    }
}
